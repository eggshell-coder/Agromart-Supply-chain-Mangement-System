// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import { login as apiLogin } from '../api/client'
import { supabase } from '../lib/supabase.js'

export const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  useEffect(() => {
    let mounted = true

    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return

      const sessionToken = data?.session?.access_token || null
      const sessionUser = data?.session?.user || null
      setToken(sessionToken)
      setUser(sessionUser)
      if (sessionToken) localStorage.setItem('token', sessionToken)
      else localStorage.removeItem('token')
    }

    restoreSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      const nextToken = session?.access_token || null
      setToken(nextToken)
      setUser(session?.user || null)
      if (nextToken) localStorage.setItem('token', nextToken)
      else localStorage.removeItem('token')
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    const data = await apiLogin(email, password)
    setToken(data.token)
    setUser(data.user || null)
    return data
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
