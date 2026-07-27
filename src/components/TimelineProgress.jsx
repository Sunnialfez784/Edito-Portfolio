import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

function toTimecode(pct) {
  const totalSeconds = Math.floor(pct * 1.2)
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const ss = String(totalSeconds % 60).padStart(2, '0')
  const ff = String(Math.floor((pct * 3.6) % 24)).padStart(2, '0')
  return `${mm}:${ss}:${ff}`
}

export default function TimelineProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })
  const [pct, setPct] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)))
  }, [scrollYProgress])

  return (
    <div className="fixed top-0 left-0 right-0 z-[80]">
      <div className="h-[3px] w-full bg-white/5">
        <motion.div
          className="h-full bg-grad-violet-cyan origin-left shadow-glow"
          style={{ scaleX }}
        />
      </div>
      <div className="hidden lg:flex absolute top-1.5 right-6 items-center gap-2 timecode select-none">
        <span className="text-cyan-400">{toTimecode(pct)}</span>
        <span className="text-mist-700">·</span>
        <span>{pct}%</span>
      </div>
    </div>
  )
}
