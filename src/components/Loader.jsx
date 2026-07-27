import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1700
    const raf = () => {
      const elapsed = Date.now() - start
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setPct(next)
      if (next < 100) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl sm:text-4xl tracking-wide"
      >
        REHANN<span className="text-violet-500">.</span>
      </motion.div>

      <div className="mt-8 w-52 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-grad-violet-cyan"
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      <div className="mt-4 flex items-center gap-3 timecode">
        <span>00:00:0{Math.min(9, Math.floor(pct / 12))}</span>
        <span className="text-mist-700">/</span>
        <span>{pct}%</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-blink" />
      </div>
    </motion.div>
  )
}
