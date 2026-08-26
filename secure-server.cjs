require('dotenv').config()
const http = require('http')
const { spawn } = require('child_process')
const express = require('express')
const { createClient } = require('@supabase/supabase-js')
const path = require('path')

const PUBLIC_PORT = Number(process.env.PORT || 3000)
const INTERNAL_PORT = Number(process.env.INTERNAL_PORT || 3001)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SECRET_KEY

if (!SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_ANON_KEY/VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
})
const auditClient = SUPABASE_SERVICE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
  : null

const child = spawn(process.execPath, ['server.cjs'], {
  env: { ...process.env, PORT: String(INTERNAL_PORT) },
  stdio: 'inherit'
})

function isSuperadminRoute(method, pathname) {
  return pathname.startsWith('/api/audit') || pathname.startsWith('/api/admin/staff')
}

function isAdminRoute(method, pathname) {
  if (method === 'GET') return pathname === '/api/debug' || pathname === '/api/auth/providers'
  if (method === 'DELETE' && pathname.startsWith('/api/')) return true
  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && /^\/api\/(districts|products|warehouses|vehicles)(\/|$)/.test(pathname)) return true
  return false
}

async function authenticate(req) {
  const match = (req.headers.authorization || '').match(/^Bearer\s+(.+)$/i)
  if (!match) return { ok: false, status: 401, error: 'Authentication required' }

  const token = match[1]
  const { data, error } = await authClient.auth.getUser(token)
  if (error || !data?.user) return { ok: false, status: 401, error: 'Invalid or expired session' }

  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } }
  })
  const { data: profile, error: profileError } = await userClient
    .from('profiles')
    .select('id, full_name, role, requested_role, created_at')
    .eq('id', data.user.id)
    .maybeSingle()

  if (profileError) return { ok: false, status: 500, error: 'Unable to load user profile' }
  if (!profile) return { ok: false, status: 403, error: 'User profile is missing' }
  if (profile.role === 'pending') return { ok: false, status: 403, error: 'Account is pending administrator approval' }
  if (!['user', 'admin', 'superadmin'].includes(profile.role)) return { ok: false, status: 403, error: 'Account is not authorized' }

  return { ok: true, user: data.user, profile, token, userClient }
}

function sanitizeBody(body) {
  if (!body || typeof body !== 'object') return null
  const copy = JSON.parse(JSON.stringify(body))
  for (const key of ['password', 'newPassword', 'access_token', 'refresh_token', 'SUPABASE_SERVICE_KEY', 'SUPABASE_SECRET_KEY']) {
    if (key in copy) copy[key] = '[REDACTED]'
  }
  return copy
}

function entityFromPath(pathname) {
  return pathname.split('/').filter(Boolean)[1] || 'unknown'
}

function entityIdFromPath(pathname) {
  const p = pathname.split('/').filter(Boolean)[2]
  return p && p.length <= 128 ? p : null
}

async function writeAudit(req, auth, statusCode) {
  if (!auditClient || !auth?.user || !['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return
  try {
    await auditClient.from('system_audit_log').insert({
      actor_user_id: auth.user.id,
      actor_name: auth.profile.full_name || auth.user.email || null,
      actor_role: auth.profile.role,
      action: `${req.method} ${req.path}`,
      http_method: req.method,
      endpoint: req.path,
      entity: entityFromPath(req.path),
      entity_id: entityIdFromPath(req.path),
      request_summary: sanitizeBody(req.body),
      status_code: statusCode
    })
  } catch (err) {
    console.error('[audit-log]', err.message)
  }
}

const gateway = express()
gateway.disable('x-powered-by')
gateway.use(express.json({ limit: '1mb' }))
gateway.use(express.urlencoded({ extended: true }))

gateway.use(async (req, res, next) => {
  if (!req.path.startsWith('/api/')) return next()
  try {
    const auth = await authenticate(req)
    if (!auth.ok) return res.status(auth.status).json({ error: auth.error })
    if (isSuperadminRoute(req.method, req.path) && auth.profile.role !== 'superadmin') {
      return res.status(403).json({ error: 'Super administrator permission required' })
    }
    if (isAdminRoute(req.method, req.path) && !['admin', 'superadmin'].includes(auth.profile.role)) {
      return res.status(403).json({ error: 'Administrator permission required' })
    }
    req.agromartAuth = auth
    res.on('finish', () => writeAudit(req, auth, res.statusCode))
    next()
  } catch (err) {
    console.error('[auth-gateway]', err)
    res.status(500).json({ error: 'Authentication service unavailable' })
  }
})

gateway.get('/api/audit/history', async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit || 100), 1), 500)
  const { data, error } = await req.agromartAuth.userClient
    .from('system_audit_log')
    .select('audit_id, actor_user_id, actor_name, actor_role, action, http_method, endpoint, entity, entity_id, request_summary, status_code, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) return res.status(400).json({ error: error.message })
  res.json(data || [])
})

gateway.get('/api/admin/staff', async (req, res) => {
  const { data, error } = await req.agromartAuth.userClient
    .from('profiles')
    .select('id, full_name, role, requested_role, created_at')
    .order('created_at', { ascending: false })
  if (error) return res.status(400).json({ error: error.message })
  res.json(data || [])
})

gateway.patch('/api/admin/staff/:id', async (req, res) => {
  const role = req.body?.role
  if (!['pending', 'user', 'admin', 'superadmin'].includes(role)) return res.status(400).json({ error: 'Invalid role' })
  const { data, error } = await req.agromartAuth.userClient
    .from('profiles')
    .update({ role })
    .eq('id', req.params.id)
    .select('id, full_name, role, requested_role, created_at')
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// Serve the Vite production build from the same public Railway service.
gateway.use(express.static(path.join(__dirname, 'dist'), { index: false }))
gateway.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next()
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Proxy API traffic to the existing application server.
gateway.use((req, res) => {
  const headers = { ...req.headers, host: `127.0.0.1:${INTERNAL_PORT}` }
  if (req.agromartAuth) {
    headers['x-agromart-user-id'] = req.agromartAuth.user.id
    headers['x-agromart-user-name'] = encodeURIComponent(req.agromartAuth.profile.full_name || req.agromartAuth.user.email || '')
    headers['x-agromart-user-role'] = req.agromartAuth.profile.role
  }
  const body = req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body) ? JSON.stringify(req.body) : null
  if (body !== null) {
    headers['content-type'] = 'application/json'
    headers['content-length'] = Buffer.byteLength(body)
  } else {
    delete headers['content-length']
  }
  const proxyReq = http.request({ hostname: '127.0.0.1', port: INTERNAL_PORT, path: req.originalUrl, method: req.method, headers }, proxyRes => {
    res.statusCode = proxyRes.statusCode || 502
    for (const [key, value] of Object.entries(proxyRes.headers)) if (value !== undefined) res.setHeader(key, value)
    proxyRes.pipe(res)
  })
  proxyReq.on('error', () => {
    if (!res.headersSent) res.status(502).json({ error: 'Application server unavailable' })
    else res.end()
  })
  if (body !== null) proxyReq.end(body)
  else req.pipe(proxyReq)
})

const server = gateway.listen(PUBLIC_PORT, '0.0.0.0', () => {
  console.log(`Secure AgroMart gateway listening on ${PUBLIC_PORT}; application on ${INTERNAL_PORT}`)
})

function shutdown() {
  server.close(() => child.kill('SIGTERM'))
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
child.on('exit', code => {
  if (code && code !== 0) process.exit(code)
})
