export async function api(path, opts = {}) {
  const token = sessionStorage.getItem('agromart_token')
  const res = await fetch(path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : {}
  if (!res.ok) throw new Error(data.error || res.statusText || 'Request failed')
  return data
}

export function getSession() {
  const raw = sessionStorage.getItem('agromart_user')
  const token = sessionStorage.getItem('agromart_token')
  if (!raw || !token) return null
  try { return { user: JSON.parse(raw), token } } catch { return null }
}

export function clearSession() {
  sessionStorage.removeItem('agromart_user')
  sessionStorage.removeItem('agromart_token')
}
