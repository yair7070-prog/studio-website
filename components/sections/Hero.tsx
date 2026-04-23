'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Logomark from '@/components/brand/Logomark'
import type { HeroContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Hero({ positioning, cta, imageAlt, imageLabel }: HeroContent) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduced) { setReady(true); return }

    const played = sessionStorage.getItem('intro-played')
    if (played) {
      setReady(true)
    } else {
      // First load: wait for IntroLoader to fire 'intro-fade' before revealing
      const handler = () => setReady(true)
      window.addEventListener('intro-fade', handler, { once: true })
      return () => window.removeEventListener('intro-fade', handler)
    }
  }, [reduced])

  const vis  = (delay: number, extra?: object) => ({
    initial:  { opacity: 0, ...extra },
    animate:  ready ? { opacity: 1, ...(extra ? Object.fromEntries(Object.keys(extra).map(k => [k, 0])) : {}) } : { opacity: 0, ...extra },
    transition: { duration: 0.6, delay, ease: EASE },
  })

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-mushroom"
      aria-label={imageAlt}
    >
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

      {/* Content block — bottom-start (right in RTL) */}
      <div className="absolute bottom-0 start-0 ps-[8vw] pb-[8vw] md:ps-[6vw] md:pb-[6vw] max-w-[42rem]">
        {imageLabel && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className={
              imageLabel.lang === 'en'
                ? 'font-latinSans uppercase text-label tracking-[0.12em] text-taupe mb-4'
                : 'font-sans text-label tracking-[0.08em] text-taupe mb-4'
            }
          >
            {imageLabel.text}
          </motion.p>
        )}
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
          {/* Underline draws from reading-start (right in RTL) leftward */}
          <span className="absolute -bottom-px start-0 h-px w-0 bg-espresso group-hover:w-full transition-[width] duration-300 ease-paper motion-reduce:transition-none" />
        </motion.a>
      </div>

      {/* Scroll indicator — scales from top */}
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
