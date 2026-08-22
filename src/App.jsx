import { useEffect, useState } from 'react'
import Onboarding from './components/Onboarding'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
})

function installApiAuthInterceptor() {
  if (window.__agromartFetchInstalled) return
  const originalFetch = window.fetch.bind(window)
  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url || ''
    if (!url.startsWith('/api/')) return originalFetch(input, init)

    const token = sessionStorage.getItem('agromart_token')
    const headers = new Headers(init.headers || (typeof input !== 'string' ? input.headers : undefined))
    if (token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type') && init.body && typeof init.body === 'string') {
      headers.set('Content-Type', 'application/json')
    }
    return originalFetch(input, { ...init, headers })
  }
  window.__agromartFetchInstalled = true
}

export default function App() {
  const [screen, setScreen] = useState('loading')

  useEffect(() => {
    installApiAuthInterceptor()

    let mounted = true
    const boot = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return

      if (data.session) {
        sessionStorage.setItem('agromart_user', JSON.stringify(data.session.user))
        sessionStorage.setItem('agromart_token', data.session.access_token)
        setScreen('dashboard')
        return
      }

      sessionStorage.removeItem('agromart_user')
      sessionStorage.removeItem('agromart_token')
      const path = window.location.pathname
      const qs = new URLSearchParams(window.location.search)
      if (path === '/login' || qs.has('login')) {
        setScreen('login')
        return
      }
      const seen = localStorage.getItem('hasSeenOnboarding')
      setScreen(seen ? 'login' : 'onboarding')
    }

    boot()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      if (session) {
        sessionStorage.setItem('agromart_user', JSON.stringify(session.user))
        sessionStorage.setItem('agromart_token', session.access_token)
        setScreen('dashboard')
      } else {
        sessionStorage.removeItem('agromart_user')
        sessionStorage.removeItem('agromart_token')
        setScreen('login')
      }
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    window.history.replaceState({}, '', '/login')
    setScreen('login')
  }

  const handleLoginSuccess = () => {
    window.history.replaceState({}, '', '/')
    setScreen('dashboard')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    sessionStorage.removeItem('agromart_user')
    sessionStorage.removeItem('agromart_token')
    sessionStorage.removeItem('agromart_role')
    window.history.replaceState({}, '', '/login')
    setScreen('login')
  }

  if (screen === 'loading') return null
  if (screen === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />
  if (screen === 'login') return <Login onSuccess={handleLoginSuccess} />
  if (screen === 'dashboard') return <Dashboard onLogout={handleLogout} />
  return null
}
