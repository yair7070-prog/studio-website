'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import type { MotionValue } from 'framer-motion'

interface Props {
  /** Retained for interface stability; not consumed. */
  scrollYProgress?: MotionValue<number>
  alt: string
}

const VIDEO_SRC = '/assets/hero/hero-transformation.mp4'
const POSTER_SRC = '/assets/hero/hero-poster.jpg'

type Mode = 'reduced' | 'play'

function Gradient() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, rgba(43,36,32,0) 0%, rgba(43,36,32,0.22) 100%)',
      }}
    />
  )
}

export function HeroScrollSequence({ alt }: Props) {
  // Strict mounted flag — SSR and client first-paint render identically.
  // After mount, we check prefers-reduced-motion to pick the final mode.
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<Mode>('play')

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMode(reduced ? 'reduced' : 'play')
  }, [mounted])

  // ── Before mount + reduced motion ───────────────────────────────────────────
  // Both paths render the static poster. Pre-mount matches SSR so hydration
  // doesn't flash; reduced-motion users never see the video element.
  if (!mounted || mode === 'reduced') {
    return (
      <div className="absolute inset-0 bg-mushroom">
        <NextImage
          src={POSTER_SRC}
          alt={alt}
          fill
          priority
          unoptimized
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <Gradient />
      </div>
    )
  }

  // ── Autoplay loop (desktop + mobile, identical) ─────────────────────────────
  return (
    <div className="absolute inset-0 bg-mushroom">
      <video
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label={alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <Gradient />
    </div>
  )
}
