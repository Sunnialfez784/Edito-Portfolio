import React from 'react'
import { motion } from 'framer-motion'
import { FiInbox, FiSearch, FiFilm, FiCheckSquare, FiSend } from 'react-icons/fi'
import Reveal from './Reveal.jsx'

const STEPS = [
  { icon: FiInbox, code: '00:00', title: 'Receive Project', desc: 'You share raw footage, references and goals for the edit.' },
  { icon: FiSearch, code: '00:15', title: 'Understand Requirements', desc: 'I break down tone, pacing and platform needs before touching the timeline.' },
  { icon: FiFilm, code: '00:45', title: 'Video Editing', desc: 'Cutting, color grading, sound design and motion graphics come together.' },
  { icon: FiCheckSquare, code: '01:10', title: 'Quality Check', desc: 'Every export is reviewed frame-by-frame against the original brief.' },
  { icon: FiSend, code: '01:20', title: 'Delivery', desc: 'Final files delivered in your required format, ready to publish.' },
]

export default function Process() {
  return (
    <section className="relative section-pad">
      <Reveal className="max-w-2xl mb-16">
        <p className="eyebrow mb-4">00:11:00 — Workflow</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          How a project <span className="grad-text">moves</span>
        </h2>
      </Reveal>

      <div className="relative">
        <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 md:gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full glass border-violet-400/30 flex items-center justify-center mb-5 shadow-glow">
                <s.icon className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="timecode mb-1">{s.code}</span>
              <h3 className="font-display text-base mb-2">{s.title}</h3>
              <p className="text-sm text-mist-500 leading-relaxed max-w-full sm:max-w-[220px]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
