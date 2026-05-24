'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { HeroScrollSequence } from '@/components/sections/HeroScrollSequence'
import type { HeroContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const
const EXPO_OUT = [0.16, 1, 0.3, 1] as const

export function Hero({ positioning, cta, imageAlt }: HeroContent) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Desktop: 1.5vh runway pins the inner sticky element for ~0.5vh of effective
  // scroll, mapping linearly to video.currentTime. Mobile: no pinning; outer
  // is 100svh and the video plays as an autoplay loop instead.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0px', '-48px'])

  useEffect(() => {
    if (reduced) { setReady(true); return }
    const played = sessionStorage.getItem('intro-played')
    if (played) {
      setReady(true)
    } else {
      const handler = () => setReady(true)
      window.addEventListener('intro-fade', handler, { once: true })
      return () => window.removeEventListener('intro-fade', handler)
    }
  }, [reduced])

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] bg-mushroom md:h-[150svh]"
      aria-label={imageAlt}
    >
      <div className="h-[100svh] overflow-hidden md:sticky md:top-0">
        {/*
          Layer order (bottom → top):
          1. Hero video — desktop scroll-scrub, mobile autoplay loop
          2. Radial gradient — atmospheric depth
          3. SVG grain — paper quality
          4. UI chrome (logomark, content, scroll indicator)
          (Bottom gradient lives inside HeroScrollSequence)
        */}

        {/* ── 1. Hero video ──────────────────────────────────────────── */}
        <HeroScrollSequence
          scrollYProgress={scrollYProgress}
          alt="הדמיה של סלון בסגנון עיצוב פנים יוקרה ישראלי — ספה מבוקלה קרם, שולחן סלון מטרוורטין, קיר פלסטר וחלון זכוכית עם נוף לעיר"
        />

        {/* ── 2. Radial gradient — depth toward bottom reading-end ──── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 18% 92%, rgba(110,99,88,0.13) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        {/* ── 3. Fine grain — SVG fractal noise at 3% opacity ────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '256px 256px',
            opacity: 0.03,
            mixBlendMode: 'multiply',
          }}
          aria-hidden="true"
        />

        {/* ── "הדמיה" label — image is AI-generated, label stays ─────── */}
        <span
          className="absolute top-4 start-4 text-small text-bone/50 select-none z-10"
          lang="he"
          aria-hidden="true"
        >
          הדמיה
        </span>

        {/* ── Logomark — top-end (left in RTL), 24px inset, z above sequence ── */}
        <div className="absolute top-6 end-6 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <Image
              src="/assets/brand/aw-logo.png"
              alt="a.w interior design — Adi Weinstein"
              width={500}
              height={500}
              priority
              className="w-auto h-12 md:h-16 lg:h-20"
            />
            <span className="sr-only">a.w interior design — Adi Weinstein</span>
          </motion.div>
        </div>

        {/* ── Content block — bottom-start (right in RTL) + scroll parallax ── */}
        <motion.div
          className="absolute bottom-0 start-0 ps-[8vw] pb-[8vw] md:ps-[6vw] md:pb-[6vw] max-w-[42rem]"
          style={reduced ? {} : { y: contentY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24, letterSpacing: '0.02em' }}
            animate={ready ? { opacity: 1, y: 0, letterSpacing: '0em' } : { opacity: 0, y: 24, letterSpacing: '0.02em' }}
            transition={{ duration: 1.2, delay: 0.4, ease: EXPO_OUT }}
            className="font-serif font-bold text-display-xl text-bone mb-8"
          >
            {positioning}
          </motion.h1>
          <motion.a
            href="#lead-form"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
            className="group relative inline-block font-serif text-body-l text-bone py-3 px-2 -mx-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-mushroom"
          >
            {cta}
            {/* Underline draws from reading-start (right in RTL) */}
            <span className="absolute -bottom-px start-0 h-px w-0 bg-bone group-hover:w-full transition-[width] duration-300 ease-paper motion-reduce:transition-none" />
          </motion.a>
        </motion.div>

        {/* ── Scroll indicator — thin vertical tick at bottom centre ── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px bg-bone opacity-30 origin-top"
          initial={{ scaleY: 0 }}
          animate={ready ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
          style={{ height: 48 }}
        />
      </div>
    </section>
  )
}
