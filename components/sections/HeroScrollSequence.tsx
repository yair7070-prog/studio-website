'use client'

import { useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import type { MotionValue } from 'framer-motion'

interface Props {
  scrollYProgress: MotionValue<number>
  alt: string
}

const TOTAL = 192

function frameSrc(n: number) {
  return `/hero-frames/frame_${String(n).padStart(3, '0')}.webp`
}

type Mode = 'mobile' | 'reduced' | 'sequence'

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

export function HeroScrollSequence({ scrollYProgress, alt }: Props) {
  // Strict mounted flag — same pattern as IntroLoader and Cursor.
  // Before mount: SSR and client first-paint are identical (no browser APIs,
  // no Framer Motion scroll state). After mount: real mode is detected.
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<Mode>('sequence')
  const imgRef = useRef<HTMLImageElement>(null)

  // All hooks called unconditionally at top level (React rules of hooks)
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const mobile = !window.matchMedia('(min-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMode(mobile ? 'mobile' : reduced ? 'reduced' : 'sequence')
  }, [mounted])

  // Preload first 30 visible frames (001→030)
  useEffect(() => {
    if (!mounted || mode !== 'sequence') return
    for (let i = 1; i <= 30; i++) {
      const img = new Image()
      img.src = frameSrc(i)
    }
  }, [mounted, mode])

  // Lazy-preload remaining frames (031→192) once the page settles
  useEffect(() => {
    if (!mounted || mode !== 'sequence') return
    const load = () => {
      for (let i = 31; i <= TOTAL; i++) {
        const img = new Image()
        img.src = frameSrc(i)
      }
    }
    if (typeof (window as any).requestIdleCallback === 'function') {
      const id: number = (window as any).requestIdleCallback(load, { timeout: 3000 })
      return () => (window as any).cancelIdleCallback(id)
    }
    const id = setTimeout(load, 2000)
    return () => clearTimeout(id)
  }, [mounted, mode])

  // Drive frame swaps from scroll position
  useEffect(() => {
    if (!mounted || mode !== 'sequence') return
    return scrollYProgress.on('change', (v) => {
      const n = Math.max(1, Math.min(TOTAL, Math.round(1 + v * (TOTAL - 1))))
      if (imgRef.current) imgRef.current.src = frameSrc(n)
    })
  }, [scrollYProgress, mounted, mode])

  // ── Before mount ────────────────────────────────────────────────────────────
  // Renders identically on server and client first-paint.
  // next/image with priority adds <link rel="preload"> for frame_001 (LCP hint).
  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-mushroom">
        <NextImage
          src={frameSrc(1)}
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

  // ── After mount ─────────────────────────────────────────────────────────────

  // Mobile: static hero image, no scroll sequence
  if (mode === 'mobile') {
    return (
      <div className="absolute inset-0 bg-mushroom">
        <NextImage
          src="/hero.webp"
          alt={alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
        />
        <Gradient />
      </div>
    )
  }

  // Reduced motion: show the resolved final frame statically
  if (mode === 'reduced') {
    return (
      <div className="absolute inset-0 bg-mushroom">
        <img
          src={frameSrc(1)}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <Gradient />
      </div>
    )
  }

  // Scroll sequence: plain <img> whose src is updated on each scroll tick.
  // frame_001 is already cached from the pre-mount NextImage preload above.
  return (
    <div className="absolute inset-0 bg-mushroom">
      <img
        ref={imgRef}
        src={frameSrc(1)}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <Gradient />
    </div>
  )
}
