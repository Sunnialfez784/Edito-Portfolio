import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import Reveal from './Reveal.jsx'

const FAQS = [
  { q: 'How long does editing take?', a: 'Most Reels and short-form edits are delivered within 24–48 hours. Long-form YouTube videos typically take 3–5 days depending on length and complexity.' },
  { q: 'Can you edit YouTube videos?', a: 'Yes — long-form editing is one of my core services, including pacing, sound design, subtitles and thumbnail-ready stills.' },
  { q: 'Do you edit Instagram Reels?', a: 'Absolutely. I specialize in trend-aware, high-retention vertical edits built for Reels, Shorts and TikTok.' },
  { q: 'Can I request revisions?', a: 'Yes, every project includes revision rounds so the final edit matches your vision exactly.' },
  { q: 'Do you use AI tools?', a: 'I use AI tools for background removal, voiceovers, subtitle generation and smart editing — always as an assist, never a replacement for craft.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative section-pad">
      <Reveal className="max-w-2xl mb-14">
        <p className="eyebrow mb-4">00:13:30 — FAQ</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Common <span className="grad-text">questions</span>
        </h2>
      </Reveal>

      <div className="max-w-3xl space-y-4 mx-auto">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-cursor-hover
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="font-display text-sm sm:text-base">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 shrink-0"
                  >
                    <FiPlus size={15} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-mist-500 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
