import React from 'react'
import { FiPhone, FiMail, FiInstagram, FiLinkedin, FiYoutube, FiGithub } from 'react-icons/fi'
import { SiBehance } from 'react-icons/si'

const QUICK_LINKS = ['Home', 'Albums', 'Skills', 'Services', 'Contact']
const SOFTWARE = ['CapCut Pro', 'DaVinci Resolve', 'Canva', 'Generative AI']
const SOCIALS = [
  { icon: FiInstagram, href: 'https://www.instagram.com/rehanneditz/' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/rehan-sorthiya-573090381/' },
  { icon: FiYoutube, href: 'https://www.youtube.com/@rehann-editz11' },
  { icon: SiBehance, href: 'https://www.behance.net/khwajaji11' },
  { icon: FiGithub, href: 'https://github.com/rehan635' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div className="relative section-pad !py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-2xl mb-4">
            REHANN<span className="text-violet-500">.</span>
          </p>
          <p className="text-sm text-mist-500 leading-relaxed mb-5">
            Transforming Ideas into Cinematic Stories.
          </p>
          <div className="flex gap-2.5">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-violet-500/20 hover:text-violet-300 text-mist-500 transition-colors"
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-sm mb-4 text-mist-300">Quick Links</p>
          <ul className="space-y-2.5 text-sm text-mist-500">
            {QUICK_LINKS.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm mb-4 text-mist-300">Software</p>
          <ul className="space-y-2.5 text-sm text-mist-500">
            {SOFTWARE.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm mb-4 text-mist-300">Contact</p>
          <ul className="space-y-3 text-sm text-mist-500">
            <li className="flex items-center gap-2">
              <FiPhone size={13} className="text-cyan-400" /> +91 7046340306
            </li>
            <li className="flex items-center gap-2">
              <FiMail size={13} className="text-cyan-400" /> rehanraja4726@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/[0.06] py-6 px-6 sm:px-10 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-3 timecode">
        <span>© {new Date().getFullYear()} Rehann. All rights reserved.</span>
        <span>Built with React, Tailwind &amp; Framer Motion</span>
      </div>
    </footer>
  )
}
