import { useState, useEffect } from 'react'
import Onboarding from './components/Onboarding'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

export default function App() {
  const [screen, setScreen] = useState('loading')

  useEffect(() => {
    const token = sessionStorage.getItem('agromart_token')
    const path  = window.location.pathname
    const qs    = new URLSearchParams(window.location.search)

    if (token) { setScreen('dashboard'); return }
    if (path === '/login' || qs.has('login')) { setScreen('login'); return }

    const seen = localStorage.getItem('hasSeenOnboarding')
    setScreen(seen ? 'login' : 'onboarding')
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

  const handleLogout = () => {
    sessionStorage.removeItem('agromart_user')
    sessionStorage.removeItem('agromart_token')
    sessionStorage.removeItem('agromart_role')
    localStorage.removeItem('hasSeenOnboarding')
    window.history.replaceState({}, '', '/login')
    setScreen('login')
  }

  if (screen === 'loading')    return null
  if (screen === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />
  if (screen === 'login')      return <Login onSuccess={handleLoginSuccess} />
  if (screen === 'dashboard')  return <Dashboard onLogout={handleLogout} />
  return null
}
