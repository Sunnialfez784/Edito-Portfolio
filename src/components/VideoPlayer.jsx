import React from 'react'
import { motion } from 'framer-motion'
import {
  FiAward, FiMessageCircle, FiDollarSign, FiCompass,
  FiRefreshCw, FiTrendingUp, FiCheckCircle, FiClock, FiSmile,
} from 'react-icons/fi'
import Reveal from './Reveal.jsx'

const REASONS = [
  { icon: FiAward, title: 'High Quality Editing', desc: 'Every frame gets meticulous attention before it ships.' },
  { icon: FiMessageCircle, title: 'Fast Communication', desc: 'Clear, responsive updates from brief to delivery.' },
  { icon: FiDollarSign, title: 'Affordable Pricing', desc: 'Premium output at rates that respect your budget.' },
  { icon: FiCompass, title: 'Creative Ideas', desc: 'Fresh concepts, not just cutting on the beat.' },
  { icon: FiRefreshCw, title: 'Unlimited Creativity', desc: 'No two edits look the same — always tailored to you.' },
  { icon: FiTrendingUp, title: 'Modern Editing Style', desc: 'Trend-aware pacing that performs on today\'s platforms.' },
  { icon: FiCheckCircle, title: 'Professional Workflow', desc: 'Organized handoffs, versioning and file management.' },
  { icon: FiClock, title: 'On-Time Delivery', desc: 'Deadlines are commitments, not suggestions.' },
  { icon: FiSmile, title: 'Client Satisfaction', desc: 'Revisions and feedback loops until it feels right.' },
]

export default function WhyChooseMe() {
  return (
    <section id="why" className="relative section-pad">
      <Reveal className="max-w-2xl mb-16">
        <p className="eyebrow mb-4">00:08:05 — Why Me</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Why clients <span className="grad-text">choose Rehann</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {REASONS.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
            whileHover={{ y: -6, borderColor: 'rgba(139,92,246,0.4)' }}
            className="card p-6 flex items-start gap-4"
          >
            <span className="w-10 h-10 rounded-lg bg-white/5 text-cyan-400 flex items-center justify-center shrink-0">
              <r.icon size={17} />
            </span>
            <div>
              <h3 className="font-display text-base mb-1">{r.title}</h3>
              <p className="text-sm text-mist-500 leading-relaxed">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
