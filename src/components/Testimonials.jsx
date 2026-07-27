import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Reveal from './Reveal.jsx'

const TESTIMONIALS = [
  {
    name: 'Aarav Mehta',
    role: 'Founder, Aether Skincare',
    text: 'Rehann turned our raw product footage into a launch film that genuinely felt like an agency-level ad. Communication was fast and revisions were painless.',
    initials: 'AM',
  },
  {
    name: 'Sara Kapoor',
    role: 'Content Creator, 240K subs',
    text: 'My retention jumped noticeably after switching my Reels editing to Rehann. The pacing and caption style just hits different.',
    initials: 'SK',
  },
  {
    name: 'Daniel Cruz',
    role: 'Marketing Lead, Northside Coffee',
    text: 'Professional, on-time, and genuinely creative. The color grading alone made our brand story look ten times more premium.',
    initials: 'DC',
  },
  {
    name: 'Priya Nair',
    role: 'Podcast Host',
    text: 'Fast turnaround on long-form episodes without ever feeling rushed. Rehann understands pacing for spoken content really well.',
    initials: 'PN',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const t = TESTIMONIALS[index]

  return (
    <section className="relative section-pad">
      <Reveal className="max-w-2xl mb-16 mx-auto text-center">
        <p className="eyebrow mb-4">00:09:40 — Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          What clients <span className="grad-text">say</span>
        </h2>
      </Reveal>

      <div className="relative max-w-2xl mx-auto px-0 sm:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card p-6 sm:p-10 text-center"
          >
            <div className="flex justify-center gap-1 mb-5 text-cyan-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="fill-current" size={16} />
              ))}
            </div>
            <p className="text-base sm:text-lg text-mist-200 leading-relaxed italic">"{t.text}"</p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3">
              <span className="w-11 h-11 rounded-full bg-grad-violet-cyan text-ink-950 font-display flex items-center justify-center text-sm">
                {t.initials}
              </span>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="timecode">{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 flex-wrap">
          <button
            onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            data-cursor-hover
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-cyan-400"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-grad-violet-cyan' : 'w-1.5 bg-white/15'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            data-cursor-hover
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-cyan-400"
            aria-label="Next testimonial"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
