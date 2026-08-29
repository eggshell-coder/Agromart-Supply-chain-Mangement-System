import { useEffect, useState, useCallback } from 'react'
import { supabase } from './lib/supabase'
import { api, getSession, clearSession } from './lib/api'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import Placeholder from './pages/_Placeholder'

// Every nav key maps to a real component reference. Replaced one-by-one as
// each page is delivered - a missing page fails the build, not a user click.
const PAGES = {
  'dashboard': () => <Placeholder name="Dashboard" />,
  'orders': () => <Placeholder name="Orders" />,
  'shipments': () => <Placeholder name="Shipments" />,
  'product-requests': () => <Placeholder name="Transfer Requests" />,
  'farmers': () => <Placeholder name="Farmers" />,
  'products': () => <Placeholder name="Products" />,
  'warehouses': () => <Placeholder name="Warehouses" />,
  'vehicles': () => <Placeholder name="Vehicles" />,
  'spoilage': () => <Placeholder name="Spoilage" />,
  'monitoring': () => <Placeholder name="Cold Chain Monitoring" />,
  'weather': () => <Placeholder name="Weather" />,
  'priceaudit': () => <Placeholder name="Price Audit" />,
  'provenance': () => <Placeholder name="Provenance" />,
  'notifications': () => <Placeholder name="Notifications" />,
}

function AuthGate({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      const local = getSession()
      setSession(data.session && local ? local : null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (!sess) { clearSession(); setSession(null) }
    })
    return () => { mounted = false; sub.subscription.unsubscribe() }
  }, [])

  if (session === undefined) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-2 border-forest-700 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  if (session === null) return <MinimalSignedOutFallback onSignedIn={s => setSession(s)} />
  return children(session)
}

function MinimalSignedOutFallback({ onSignedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setError(''); setBusy(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (error) throw error
      sessionStorage.setItem('agromart_user', JSON.stringify(data.user))
      sessionStorage.setItem('agromart_token', data.session.access_token)
      onSignedIn({ user: data.user, token: data.session.access_token })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-surface px-4">
      <form onSubmit={submit} className="card w-full max-w-sm p-6 space-y-3">
        <p className="font-bold text-forest-950 text-lg mb-1">Sign in (temporary)</p>
        {error && <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</div>}
        <div>
          <label className="field-label">Email</label>
          <input className="field-input" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label className="field-label">Password</label>
          <input className="field-input" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <button type="submit" disabled={busy} className="btn btn-primary w-full">{busy ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [unreadCount, setUnreadCount] = useState(0)

  const loadUnread = useCallback(async () => {
    try {
      const list = await api('/api/notifications')
      if (Array.isArray(list)) setUnreadCount(list.filter(n => !n.is_read).length)
    } catch { /* don't break the shell if this fails */ }
  }, [])

  useEffect(() => {
    loadUnread()
    const id = setInterval(loadUnread, 60000)
    return () => clearInterval(id)
  }, [loadUnread])

  const logout = async () => {
    await supabase.auth.signOut()
    clearSession()
    window.location.reload()
  }

  return (
    <AuthGate>
      {session => {
        const Page = PAGES[page] || PAGES.dashboard
        return (
          <div className="flex min-h-screen bg-surface">
            <Sidebar page={page} onNavigate={setPage} unreadCount={unreadCount} onLogout={logout} user={session.user} />
            <div className="flex-1 min-w-0 flex flex-col">
              <Topbar page={page} onNavigate={setPage} unreadCount={unreadCount} />
              <main className="flex-1 p-4 md:p-7"><Page /></main>
            </div>
          </div>
        )
      }}
    </AuthGate>
  )
}
