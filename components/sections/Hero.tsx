'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Logomark from '@/components/brand/Logomark'
import type { HeroContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Hero({ positioning, cta, imageAlt }: HeroContent) {
  const reduced  = useReducedMotion()
  const [ready, setReady] = useState(false)
  const heroRef  = useRef<HTMLElement>(null)

  /* Scroll-linked parallax on the content block */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-48px'])

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
      className="relative min-h-[100svh] overflow-hidden bg-mushroom"
      aria-label={imageAlt}
    >
      {/*
        Atmospheric layers — static, no animation.
        1. Radial gradient: depth toward bottom reading-end corner (left in RTL).
        2. Fine grain: SVG fractal noise at 3% opacity — paper-like material quality.
        imageLabel ("הדמיה") removed; atmosphere communicates "placeholder" without stating it.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 18% 92%, rgba(110,99,88,0.13) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
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

      {/* Logomark — top-end (left in RTL) */}
      <div className="absolute top-0 end-0 pe-[8vw] pt-[6vw] md:pe-[6vw]">
        <div className="flex flex-col items-end gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <Logomark variant="original" size={56} />
          </motion.div>
          <span className="sr-only">a.w interior design — Adi Weinstein</span>
        </div>
      </div>

      {/* Content block — bottom-start (right in RTL) with scroll parallax */}
      <motion.div
        className="absolute bottom-0 start-0 ps-[8vw] pb-[8vw] md:ps-[6vw] md:pb-[6vw] max-w-[42rem]"
        style={reduced ? {} : { y: contentY }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="font-serif text-display-xl text-espresso mb-8"
        >
          {positioning}
        </motion.h1>
        <motion.a
          href="#lead-form"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
          className="group relative inline-block font-serif text-body-l text-espresso py-3 px-2 -mx-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-mushroom"
        >
          {cta}
          {/* Underline draws from reading-start (right in RTL) */}
          <span className="absolute -bottom-px start-0 h-px w-0 bg-espresso group-hover:w-full transition-[width] duration-300 ease-paper motion-reduce:transition-none" />
        </motion.a>
      </motion.div>

      {/* Scroll indicator — thin vertical tick at bottom centre */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px bg-taupe opacity-40 origin-top"
        initial={{ scaleY: 0 }}
        animate={ready ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
        style={{ height: 48 }}
      />
    </section>
  )
}
