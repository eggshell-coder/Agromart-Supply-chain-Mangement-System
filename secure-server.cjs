require('dotenv').config()
const http = require('http')
const { spawn } = require('child_process')
const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const PUBLIC_PORT = Number(process.env.PORT || 3000)
const INTERNAL_PORT = Number(process.env.INTERNAL_PORT || 3001)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_ANON_KEY/VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
})

const child = spawn(process.execPath, ['server.cjs'], {
  env: { ...process.env, PORT: String(INTERNAL_PORT) },
  stdio: 'inherit'
})

function isAdminRoute(method, pathname) {
  if (method === 'GET') return pathname === '/api/debug' || pathname === '/api/auth/providers'
  if (method === 'DELETE' && pathname.startsWith('/api/')) return true
  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') &&
      /^\/api\/(districts|products|warehouses|vehicles)(\/|$)/.test(pathname)) return true
  if (pathname.startsWith('/api/provenance') || pathname.startsWith('/api/audit')) return true
  return false
}

async function authenticate(req) {
  const header = req.headers.authorization || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  if (!match) return { ok: false, status: 401, error: 'Authentication required' }

  const token = match[1]
  const { data, error } = await authClient.auth.getUser(token)
  if (error || !data?.user) return { ok: false, status: 401, error: 'Invalid or expired session' }

  const { data: profile, error: profileError } = await authClient
    .from('profiles')
    .select('id, full_name, role')
    .eq('id', data.user.id)
    .maybeSingle()

  if (profileError) return { ok: false, status: 500, error: 'Unable to load user profile' }
  if (!profile) return { ok: false, status: 403, error: 'User profile is missing' }
  if (profile.role === 'pending') return { ok: false, status: 403, error: 'Account is pending administrator approval' }
  if (!['user', 'admin'].includes(profile.role)) return { ok: false, status: 403, error: 'Account is not authorized' }

  return { ok: true, user: data.user, profile }
}

const gateway = express()
gateway.disable('x-powered-by')

// Public application pages/assets are forwarded unchanged. API requests are authenticated here.
gateway.use(async (req, res, next) => {
  if (!req.path.startsWith('/api/')) return next()

  const auth = await authenticate(req)
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error })
  if (isAdminRoute(req.method, req.path) && auth.profile.role !== 'admin') {
    return res.status(403).json({ error: 'Administrator permission required' })
  }

  req.agromartAuth = auth
  next()
})

gateway.use((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: INTERNAL_PORT,
    path: req.originalUrl,
    method: req.method,
    headers: { ...req.headers, host: `127.0.0.1:${INTERNAL_PORT}` }
  }

  const proxyReq = http.request(options, proxyRes => {
    res.statusCode = proxyRes.statusCode || 502
    for (const [key, value] of Object.entries(proxyRes.headers)) {
      if (value !== undefined) res.setHeader(key, value)
    }
    proxyRes.pipe(res)
  })

  proxyReq.on('error', err => {
    if (!res.headersSent) res.status(502).json({ error: 'Application server unavailable' })
    else res.end()
  })

  req.pipe(proxyReq)
})

const server = gateway.listen(PUBLIC_PORT, () => {
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
