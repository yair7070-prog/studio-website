'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Logomark from '@/components/brand/Logomark'
import { HeroScrollSequence } from '@/components/sections/HeroScrollSequence'
import type { HeroContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Hero({ positioning, cta, imageAlt }: HeroContent) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Outer 300vh container drives scroll progress for the full sequence.
  // 'end end' = section bottom at viewport bottom = 200vh of effective scroll
  // before the hero releases and About comes into view.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // Parallax completes at 50% so text is settled well before deconstruction peaks
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
    /*
      Outer container: tall enough to give the sticky inner ample scroll runway.
      - Desktop (md+): 300vh → ~200vh of pinned scroll before releasing
      - Mobile: h-screen → normal single-viewport hero, no pinning
      bg-mushroom on the outer prevents any flash when the sticky inner releases.
    */
    <section
      ref={heroRef}
      className="relative h-screen bg-mushroom md:h-[300vh]"
      aria-label={imageAlt}
    >
      {/*
        Sticky inner: pins to viewport top for the full 300vh scroll range.
        overflow-hidden must be on THIS element, not the outer section
        (position:sticky breaks if an ancestor has overflow:hidden).
        - Desktop: sticky top-0, 100svh tall
        - Mobile: normal flow, 100svh tall (same visuals, no pinning)
      */}
      <div className="h-[100svh] overflow-hidden md:sticky md:top-0">
        {/*
          Layer order (bottom → top):
          1. Hero image — full-bleed, scroll-linked sequence
          2. Radial gradient — atmospheric depth
          3. SVG grain — paper quality
          4. UI chrome (logomark, content, scroll indicator)
          (Bottom gradient lives inside HeroScrollSequence)
        */}

        {/* ── 1. Hero image — scroll-linked deconstruction sequence ─── */}
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

        {/* ── Logomark — top-end (left in RTL) ───────────────────────── */}
        <div className="absolute top-0 end-0 pe-[8vw] pt-[6vw] md:pe-[6vw]">
          <div className="flex flex-col items-end gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <Logomark variant="bone" size={60} />
            </motion.div>
            <span className="sr-only">a.w interior design — Adi Weinstein</span>
          </div>
        </div>

        {/* ── Content block — bottom-start (right in RTL) + scroll parallax */}
        <motion.div
          className="absolute bottom-0 start-0 ps-[8vw] pb-[8vw] md:ps-[6vw] md:pb-[6vw] max-w-[42rem]"
          style={reduced ? {} : { y: contentY }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="font-serif text-display-xl text-bone mb-8"
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
