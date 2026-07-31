import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'rehann_portfolio_admin_session_v1'

const ADMIN_ACCOUNT = {
  username: 'admin',
  password: 'Raja@11',
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (error) {
    console.warn('Failed to read admin session', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession)

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.warn('Failed to persist admin session', error)
    }
  }, [session])

  const login = useCallback(({ username, password }) => {
    if (
      username.trim().toLowerCase() === ADMIN_ACCOUNT.username &&
      password === ADMIN_ACCOUNT.password
    ) {
      const nextSession = {
        username: ADMIN_ACCOUNT.username,
        loggedInAt: new Date().toISOString(),
      }
      setSession(nextSession)
      return { ok: true }
    }

    return { ok: false, message: 'Invalid admin credentials.' }
  }, [])

  const logout = useCallback(() => {
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [login, logout, session]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
