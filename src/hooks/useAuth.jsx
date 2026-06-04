import React, { createContext, useContext, useState } from 'react'

const Ctx = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('rc_token'))
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('rc_user')) } catch { return null }
  })

  function saveSession(data) {
    const u = data.user || data
    setToken(data.token)
    setUser(u)
    localStorage.setItem('rc_token', data.token)
    localStorage.setItem('rc_user', JSON.stringify(u))
  }

  function logout() {
    setToken(null); setUser(null)
    localStorage.removeItem('rc_token')
    localStorage.removeItem('rc_user')
  }

  function updateUser(updates) {
    const next = { ...user, ...updates }
    setUser(next)
    localStorage.setItem('rc_user', JSON.stringify(next))
  }

  return (
    <Ctx.Provider value={{ token, user, saveSession, logout, updateUser }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() { return useContext(Ctx) }
