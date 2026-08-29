import { useEffect, useState } from 'react'
import Onboarding from './components/Onboarding'
import Login from './components/Login'
import Dashboard from './components/DashboardWithOrderWorkflow'
import AdminConsole from './components/AdminConsole'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_566VpDhmAdFAWvayT7fIw_XvWswQXW'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })

function installApiAuthInterceptor() {
  if (window.__agromartFetchInstalled) return
  const originalFetch = window.fetch.bind(window)
  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url || ''
    if (!url.startsWith('/api/')) return originalFetch(input, init)
    const token = sessionStorage.getItem('agromart_token')
    const headers = new Headers(init.headers || (typeof input !== 'string' ? input.headers : undefined))
    if (token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type') && init.body && typeof init.body === 'string') headers.set('Content-Type', 'application/json')
    return originalFetch(input, { ...init, headers })
  }
  window.__agromartFetchInstalled = true
}

export default function App() {
  const [screen, setScreen] = useState('loading')
  const [role, setRole] = useState('user')
  useEffect(() => {
    installApiAuthInterceptor()
    let mounted = true
    const boot = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      if (data.session) {
        sessionStorage.setItem('agromart_user', JSON.stringify(data.session.user))
        sessionStorage.setItem('agromart_token', data.session.access_token)
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.session.user.id).maybeSingle()
        setRole(profile?.role || 'user')
        setScreen('dashboard')
        return
      }
      sessionStorage.removeItem('agromart_user'); sessionStorage.removeItem('agromart_token'); setRole('user')
      const path = window.location.pathname; const qs = new URLSearchParams(window.location.search)
      if (path === '/login' || qs.has('login')) { setScreen('login'); return }
      setScreen(localStorage.getItem('hasSeenOnboarding') ? 'login' : 'onboarding')
    }
    boot()
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return
      if (session) {
        sessionStorage.setItem('agromart_user', JSON.stringify(session.user)); sessionStorage.setItem('agromart_token', session.access_token)
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).maybeSingle()
        setRole(profile?.role || 'user'); setScreen(profile?.role === 'pending' ? 'login' : 'dashboard')
      } else {
        sessionStorage.removeItem('agromart_user'); sessionStorage.removeItem('agromart_token'); setRole('user'); setScreen('login')
      }
    })
    return () => { mounted = false; listener.subscription.unsubscribe() }
  }, [])
  const handleOnboardingComplete = () => { localStorage.setItem('hasSeenOnboarding','true'); window.history.replaceState({},'','/login'); setScreen('login') }
  const handleLoginSuccess = async () => { const { data: session } = await supabase.auth.getSession(); if (session?.session) { const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.session.user.id).maybeSingle(); setRole(profile?.role || 'user') }; window.history.replaceState({},'','/'); setScreen('dashboard') }
  const handleLogout = async () => { await supabase.auth.signOut(); sessionStorage.removeItem('agromart_user'); sessionStorage.removeItem('agromart_token'); sessionStorage.removeItem('agromart_role'); setRole('user'); window.history.replaceState({},'','/login'); setScreen('login') }
  if (screen === 'loading') return null
  if (screen === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />
  if (screen === 'login') return <Login onSuccess={handleLoginSuccess} />
  if (screen === 'dashboard') return <><Dashboard onLogout={handleLogout} role={role} /><AdminConsole role={role} /></>
  return null
}
