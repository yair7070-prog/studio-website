'use client'

import { useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import type { MotionValue } from 'framer-motion'

interface Props {
  scrollYProgress: MotionValue<number>
  alt: string
}

const VIDEO_SRC = '/assets/hero/hero-transformation.mp4'
const POSTER_SRC = '/assets/hero/hero-poster.jpg'

type Mode = 'reduced' | 'play' | 'scrub'

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
  // Strict mounted flag — SSR and client first-paint render identically.
  // After mount, viewport + reduced-motion checks pick the final mode.
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<Mode>('play')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = !window.matchMedia('(min-width: 768px)').matches
    setMode(reduced ? 'reduced' : mobile ? 'play' : 'scrub')
  }, [mounted])

  // Drive video.currentTime from scroll position on desktop. Wait for
  // loadedmetadata so video.duration is finite before scrubbing.
  useEffect(() => {
    if (!mounted || mode !== 'scrub') return
    const video = videoRef.current
    if (!video) return

    let unsubscribe: (() => void) | null = null

    const startScrubbing = () => {
      unsubscribe = scrollYProgress.on('change', (v) => {
        const dur = video.duration
        if (!Number.isFinite(dur) || dur <= 0) return
        video.currentTime = Math.max(0, Math.min(dur, v * dur))
      })
    }

    if (video.readyState >= 1) {
      startScrubbing()
    } else {
      video.addEventListener('loadedmetadata', startScrubbing, { once: true })
    }

    return () => {
      if (unsubscribe) unsubscribe()
      video.removeEventListener('loadedmetadata', startScrubbing)
    }
  }, [scrollYProgress, mounted, mode])

  // ── Before mount + reduced motion ───────────────────────────────────────────
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

  // ── Mobile: autoplay loop, no scroll-link ───────────────────────────────────
  if (mode === 'play') {
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

  // ── Desktop: scroll-linked scrubbing ────────────────────────────────────────
  return (
    <div className="absolute inset-0 bg-mushroom">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
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
