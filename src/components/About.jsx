import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FiFeather, FiZap, FiSmile, FiFilm, FiInstagram, FiYoutube, FiBriefcase, FiCpu,
} from 'react-icons/fi'
import Reveal from './Reveal.jsx'

const POINTS = [
  { icon: FiFilm, label: 'Professional Freelance Video Editor' },
  { icon: FiFeather, label: 'Creative Storytelling' },
  { icon: FiZap, label: 'Fast Delivery' },
  { icon: FiSmile, label: 'Client Satisfaction' },
  { icon: FiFilm, label: 'Cinematic Editing' },
  { icon: FiInstagram, label: 'Reels Specialist' },
  { icon: FiYoutube, label: 'YouTube Videos' },
  { icon: FiBriefcase, label: 'Commercial Videos' },
  { icon: FiCpu, label: 'AI Assisted Editing' },
]

const STATS = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: 'h', label: 'Fast Delivery' },
  { value: 3, suffix: '+', label: 'Years Learning & Editing' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setN(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl grad-text">
      {n}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative section-pad">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <Reveal>
          <p className="eyebrow mb-4">00:01:12 — About</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Turning raw footage into <span className="grad-text">cinematic stories</span>
          </h2>
          <p className="text-mist-500 leading-relaxed mb-4">
            I'm Rehann, a freelance video editor obsessed with rhythm, color and pacing.
            Whether it's a fast-paced Reel or a long-form YouTube documentary, every cut
            is made with intention — built to hold attention and move an audience.
          </p>
          <p className="text-mist-500 leading-relaxed mb-8">
            I combine traditional editing craft with modern AI-assisted tools to deliver
            polished, on-brand videos fast — without cutting corners on quality.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex items-center gap-3 text-sm text-mist-300"
              >
                <span className="w-8 h-8 rounded-lg glass flex items-center justify-center text-cyan-400 shrink-0">
                  <p.icon size={15} />
                </span>
                {p.label}
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="card p-6 sm:p-8 text-center hover:border-violet-400/40 hover:-translate-y-1">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="mt-2 text-sm text-mist-500">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
