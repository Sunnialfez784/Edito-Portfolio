import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiFilm, FiScissors, FiSliders } from 'react-icons/fi'
import BackgroundFX from './BackgroundFX.jsx'
import raja from '../assets/IMG-20260731-WA0011.jpg'

const ROLES = ['Video Editor', 'Reels Specialist', 'Colorist', 'Motion Designer', 'Story Teller']

function useTypewriter(words, speed = 70, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 1.6)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 sm:pt-32 pb-20 overflow-hidden bg-grad-hero">
      <BackgroundFX />

      <div className="relative z-10 w-full section-pad !py-0 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5"
          >
            00:00:01 — Now Playing
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-[4.2rem] font-extrabold tracking-tight max-w-[11ch] sm:max-w-none"
          >
            Hi, I'm <span className="grad-text">Rehann</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-3 h-auto sm:h-10 flex items-center"
          >
              <span className="text-lg sm:text-2xl font-display text-mist-300 leading-tight">
              {typed}
              <span className="inline-block w-[2px] h-6 bg-cyan-400 ml-1 align-middle animate-blink" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-mist-500 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            I help creators, brands, influencers, startups and businesses create
            high-quality cinematic videos that grab attention and increase engagement.
            From YouTube videos to Instagram Reels, promotional ads, corporate edits
            and AI-powered content — I transform raw footage into visually stunning
            stories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-4"
          >
            <a href="#contact" data-cursor-hover className="btn-primary w-full sm:w-auto">
              Hire Me
            </a>
            <a href="#albums" data-cursor-hover className="btn-ghost w-full sm:w-auto">
              <FiPlay /> View My Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 grid grid-cols-2 sm:flex items-start gap-4 sm:gap-8 timecode"
          >
            <div>
              <div className="text-mist-100 font-display text-xl">250+</div>
              Projects
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div>
              <div className="text-mist-100 font-display text-xl">3+</div>
              Years
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div>
              <div className="text-mist-100 font-display text-xl">100%</div>
              Satisfaction
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-6 rounded-[2rem] glass shadow-glow overflow-hidden">
              <img
                src={raja}
                alt="Cinematic editing workspace"
                className="w-full h-full object-cover opacity-70"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-6 card px-4 py-3 flex items-center gap-2 shadow-glow"
            >
              <FiFilm className="text-violet-400" />
              <span className="text-xs font-mono">4K_TIMELINE.mov</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 -right-8 card px-4 py-3 flex items-center gap-2"
            >
              <FiSliders className="text-cyan-400" />
              <span className="text-xs font-mono">COLOR_GRADE</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-6 left-8 card px-4 py-3 flex items-center gap-2"
            >
              <FiScissors className="text-violet-400" />
              <span className="text-xs font-mono">CUT · 00:32</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mist-700"
      >
        <span className="timecode">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
        >
          <span className="w-1 h-1.5 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
