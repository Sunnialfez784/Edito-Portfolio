import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogOut, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'
import Albums from '../components/Albums.jsx'
import BackgroundFX from '../components/BackgroundFX.jsx'

export default function Admin() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative pt-28 sm:pt-32 min-h-screen"
    >
      <BackgroundFX />
      <div className="relative section-pad !py-0 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <p className="eyebrow mb-3">Admin Dashboard</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">Manage albums and videos</h1>
            <p className="text-mist-500 max-w-2xl">
              Signed in as {session?.username}. Use the album cards to edit album covers, open an album, and manage uploaded videos.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap w-full md:w-auto">
            <Link to="/" className="btn-ghost inline-flex items-center gap-2">
              <FiArrowLeft /> Public Site
            </Link>
            <button onClick={handleLogout} className="btn-primary inline-flex items-center gap-2">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        <Albums />
      </div>
    </motion.main>
  )
}
