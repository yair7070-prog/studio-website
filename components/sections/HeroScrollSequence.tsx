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

type Mode = 'pending' | 'mobile' | 'reduced' | 'sequence'

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
  const [mode, setMode] = useState<Mode>('pending')
  const imgRef = useRef<HTMLImageElement>(null)

  // Detect environment after mount — prevents SSR hydration mismatch
  useEffect(() => {
    const mobile = !window.matchMedia('(min-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMode(mobile ? 'mobile' : reduced ? 'reduced' : 'sequence')
  }, [])

  // Preload first 30 visible frames (192→163) immediately
  useEffect(() => {
    if (mode !== 'sequence') return
    for (let i = TOTAL; i > TOTAL - 30; i--) {
      const img = new Image()
      img.src = frameSrc(i)
    }
  }, [mode])

  // Lazy-preload remaining frames (162→1) once the page settles
  useEffect(() => {
    if (mode !== 'sequence') return
    const load = () => {
      for (let i = TOTAL - 30; i >= 1; i--) {
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
  }, [mode])

  // Drive frame swaps from scroll position
  useEffect(() => {
    if (mode !== 'sequence') return
    return scrollYProgress.on('change', (v) => {
      const n = Math.max(1, Math.min(TOTAL, Math.round(TOTAL - v * (TOTAL - 1))))
      if (imgRef.current) imgRef.current.src = frameSrc(n)
    })
  }, [scrollYProgress, mode])

  // SSR + pre-hydration: render frame_192 via next/image so the browser gets
  // a <link rel="preload"> hint for it before the client detects the mode.
  if (mode === 'pending') {
    return (
      <div className="absolute inset-0 bg-mushroom">
        <NextImage
          src={frameSrc(TOTAL)}
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

  // Mobile: fall back to the static hero image, no scroll sequence
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
  // frame_192 is already cached from the pending-mode preload above.
  return (
    <div className="absolute inset-0 bg-mushroom">
      <img
        ref={imgRef}
        src={frameSrc(TOTAL)}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <Gradient />
    </div>
  )
}
