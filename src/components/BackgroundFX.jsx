import React, { useMemo } from 'react'

export default function BackgroundFX({ variant = 'default' }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 6,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-violet-600/20 blur-[120px] animate-drift" />
      <div
        className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-cyan-500/15 blur-[120px] animate-drift"
        style={{ animationDelay: '3s' }}
      />
      {variant === 'default' && (
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[110px] animate-drift"
          style={{ animationDelay: '6s' }}
        />
      )}

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animation: `floaty ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}
