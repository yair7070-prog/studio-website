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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const mobile = !window.matchMedia('(min-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMode(mobile ? 'mobile' : reduced ? 'reduced' : 'sequence')
  }, [mounted])

  // Drive video.currentTime from scroll position (desktop only).
  // Waits for loadedmetadata so video.duration is finite before scrubbing.
  useEffect(() => {
    if (!mounted || mode !== 'sequence') return
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

  // ── Before mount ────────────────────────────────────────────────────────────
  // Renders identically on server and client first-paint. Poster image is
  // the LCP candidate and matches the video's poster attribute exactly.
  if (!mounted) {
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

  // ── Reduced motion: static poster, no playback ──────────────────────────────
  if (mode === 'reduced') {
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
  // Touch-scroll scrubbing of currentTime stutters on iOS Safari and Android
  // Chrome; autoplay loop avoids the issue and keeps the motion intent.
  if (mode === 'mobile') {
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
