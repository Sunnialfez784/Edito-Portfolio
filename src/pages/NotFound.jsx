import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome } from 'react-icons/fi'
import BackgroundFX from '../components/BackgroundFX.jsx'

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex items-center justify-center text-center px-6"
    >
      <BackgroundFX />
      <div className="relative z-10">
        <p className="eyebrow mb-4">Error 00:04:04 — Clip Not Found</p>
        <h1 className="font-display text-6xl sm:text-8xl grad-text mb-4">404</h1>
        <p className="text-mist-500 max-w-md mx-auto mb-8">
          This footage didn't make the final cut. The page you're looking for doesn't exist.
        </p>
        <Link to="/" data-cursor-hover className="btn-primary">
          <FiHome /> Back to Home
        </Link>
      </div>
    </motion.main>
  )
}
