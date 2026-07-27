import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Albums', href: '#albums' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + href)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-4 sm:mx-6 lg:mx-16 rounded-2xl transition-all duration-500 flex items-center justify-between px-5 sm:px-7 py-3 ${
          scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
        }`}
      >
        <button
          onClick={() => go('#home')}
          data-cursor-hover
          className="font-display text-xl tracking-wide"
        >
          REHANN<span className="text-violet-500">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              data-cursor-hover
              className="relative text-sm font-medium text-mist-300 hover:text-white transition-colors group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-grad-violet-cyan group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        <button
          onClick={() => go('#contact')}
          data-cursor-hover
          className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm"
        >
          Let's Work Together
        </button>

        <button
          className="md:hidden text-mist-100"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 rounded-2xl glass overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="text-left py-3 px-3 rounded-lg text-mist-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button onClick={() => go('#contact')} className="btn-primary mt-2 w-full">
                Let's Work Together
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
