import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [enabled, setEnabled] = useState(true)
  const [hoverTarget, setHoverTarget] = useState(false)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) {
      setEnabled(false)
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      const el = document.elementFromPoint(mouseX, mouseY)
      setHoverTarget(!!el?.closest('a, button, [data-cursor-hover]'))
    }

    let raf
    const tick = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <div
        ref={glowRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full opacity-20 blur-3xl transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', left: 0, top: 0 }}
      />
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400"
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={ringRef}
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
          hoverTarget ? 'w-12 h-12 border-violet-400 bg-violet-500/10' : 'w-7 h-7 border-white/40'
        }`}
        style={{ left: 0, top: 0 }}
      />
    </div>
  )
}
