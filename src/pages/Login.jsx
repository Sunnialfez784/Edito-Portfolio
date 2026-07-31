import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiLock, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'
import BackgroundFX from '../components/BackgroundFX.jsx'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'
  const [form, setForm] = useState({ username: 'admin', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const submit = (event) => {
    event.preventDefault()
    const result = login(form)
    if (result.ok) {
      navigate(from, { replace: true })
      return
    }

    setError(result.message)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-24 sm:pt-28 pb-16 flex items-center justify-center"
    >
      <BackgroundFX />
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="card p-6 sm:p-8 sm:py-10">
          <p className="eyebrow mb-3">Admin Access</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">Sign in to manage the portfolio</h1>
          <p className="text-sm text-mist-500 mb-8">
            Public visitors stay on the main site. Editing tools are locked to the admin session.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs text-mist-500 mb-1.5">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-500" />
                <input
                  value={form.username}
                  onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm focus:border-violet-400 outline-none"
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-mist-500 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-500" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-sm focus:border-violet-400 outline-none"
                  placeholder="Enter Password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </motion.main>
  )
}
