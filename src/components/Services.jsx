import React from 'react'
import { motion } from 'framer-motion'
import {
  FiYoutube, FiInstagram, FiFilm, FiSliders, FiEdit3, FiZap,
  FiType, FiBriefcase, FiTrendingUp, FiMic, FiHeart, FiCpu,
} from 'react-icons/fi'
import Reveal from './Reveal.jsx'

const SERVICES = [
  { icon: FiYoutube, title: 'YouTube Editing', desc: 'Story-driven long-form edits with pacing that keeps viewers watching till the end.' },
  { icon: FiInstagram, title: 'Instagram Reels', desc: 'Trend-aware vertical edits built for reach, retention and saves.' },
  { icon: FiZap, title: 'Short Form Videos', desc: 'Punchy, high-retention cuts optimized for TikTok, Shorts and Reels.' },
  { icon: FiFilm, title: 'Long Form Editing', desc: 'Podcasts, vlogs and documentaries edited with narrative structure.' },
  { icon: FiSliders, title: 'Color Grading', desc: 'Cinematic color science that gives every frame a signature look.' },
  { icon: FiEdit3, title: 'Motion Graphics', desc: 'Kinetic titles, lower-thirds and animated graphics that add polish.' },
  { icon: FiType, title: 'Subtitles', desc: 'Styled, accurate captions designed to boost silent-watch retention.' },
  { icon: FiBriefcase, title: 'Corporate Videos', desc: 'Clean, professional edits for internal and brand communication.' },
  { icon: FiTrendingUp, title: 'Advertisements', desc: 'Conversion-focused ad cuts tailored for paid social campaigns.' },
  { icon: FiMic, title: 'Podcast Editing', desc: 'Multi-cam podcast edits with clean audio and dynamic pacing.' },
  { icon: FiHeart, title: 'Wedding Highlights', desc: 'Emotional, cinematic wedding films that feel like a movie trailer.' },
  { icon: FiCpu, title: 'AI Generated Videos', desc: 'AI-assisted voiceover, b-roll and content generation workflows.' },
]

export default function Services() {
  return (
    <section id="services" className="relative section-pad">
      <Reveal className="max-w-2xl mb-16">
        <p className="eyebrow mb-4">00:02:30 — Services</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          What I can <span className="grad-text">deliver for you</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -8 }}
            data-cursor-hover
            className="card p-7 group hover:border-violet-400/40 hover:shadow-glow"
          >
            <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-grad-violet-cyan text-ink-950 mb-5 group-hover:scale-110 transition-transform duration-300">
              <s.icon size={20} />
            </span>
            <h3 className="font-display text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-mist-500 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
