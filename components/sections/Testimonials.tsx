'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion, useAnimation, useInView, useReducedMotion } from 'framer-motion'
import type { TestimonialsContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const
const DURATION_MS = 12_000

export function Testimonials({ eyebrow, items }: TestimonialsContent) {
  const reduced = useReducedMotion()
  const [index,  setIndex]  = useState(0)
  const [paused, setPaused] = useState(false)

  const multi = items.length > 1
  const item  = items[index]

  const advance = useCallback(() => {
    setIndex(i => (i + 1) % items.length)
  }, [items.length])

  /* Auto-advance for reduced-motion (no CSS animation → no onAnimationEnd) */
  useEffect(() => {
    if (!multi || !reduced || paused) return
    const id = setInterval(advance, DURATION_MS)
    return () => clearInterval(id)
  }, [multi, reduced, paused, advance])

  /* ── Quote mark entrance + pulse ────────────────────────────────────────
     useAnimation + useInView so we can fire a scale keyframe on index
     change without fighting whileInView's priority over animate.
  */
  const quoteRef      = useRef<HTMLSpanElement>(null)
  const quoteControls = useAnimation()
  const isInView      = useInView(quoteRef, { once: true, margin: '-10%' })
  const didEnter      = useRef(false)
  const isFirstIndex  = useRef(true)

  // One-time entrance animation
  useEffect(() => {
    if (!isInView || didEnter.current) return
    didEnter.current = true
    if (!reduced) {
      quoteControls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } })
    }
  }, [isInView, reduced, quoteControls])

  // Pulse on each subsequent index change
  useEffect(() => {
    if (isFirstIndex.current) { isFirstIndex.current = false; return }
    if (reduced) return
    quoteControls.start({ scale: [1, 1.06, 1], transition: { duration: 0.5, ease: EASE } })
  }, [index, reduced, quoteControls])

  return (
    <section className="bg-bone py-section-lg" aria-labelledby="testimonials-heading">
      <div className="max-w-container mx-auto px-[6vw]">
        <h2 id="testimonials-heading" className="text-small text-taupe tracking-[0.08em] mb-24">
          {eyebrow}
        </h2>

        <div
          className="max-w-[680px] mx-auto text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Decorative opening quote — pulses on each slide change */}
          <motion.span
            ref={quoteRef}
            className="block font-latin text-[6rem] leading-none text-walnut/30 select-none mb-2"
            aria-hidden="true"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            animate={quoteControls}
          >
            &ldquo;
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -6 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
            >
              <p
                className="font-serif text-display-l text-espresso"
                style={{ lineHeight: 1.3 }}
              >
                {item.text}
              </p>
              <p className="mt-10 text-small text-taupe">
                {item.name}&ensp;·&ensp;{item.location}&ensp;·&ensp;
                <span dir="ltr" className="tabular-nums">{item.year}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {multi && (
            <div className="mt-12">
              {/* Dot-bar indicators */}
              <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="group flex items-center justify-center h-8 focus:outline-none"
                  >
                    <motion.span
                      className="block h-px bg-stone rounded-full"
                      animate={{ width: i === index ? 28 : 8, opacity: i === index ? 1 : 0.5 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{ backgroundColor: i === index ? '#8B6B4A' : undefined }}
                    />
                  </button>
                ))}
              </div>

              {/* Chevron navigation */}
              <div className="flex items-center justify-center gap-8">
                <button
                  aria-label="הקודם"
                  onClick={() => setIndex(i => (i - 1 + items.length) % items.length)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  className="flex items-center justify-center w-11 h-11 text-taupe hover:text-walnut transition-colors duration-300 ease-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 cursor-pointer"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                    <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  aria-label="הבא"
                  onClick={() => setIndex(i => (i + 1) % items.length)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  className="flex items-center justify-center w-11 h-11 text-taupe hover:text-walnut transition-colors duration-300 ease-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 cursor-pointer"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                    <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Scroll-progress hairline — fills over DURATION_MS */}
              {reduced === false && (
                <div className="mt-6 h-px bg-stone/40 relative overflow-hidden">
                  <div
                    key={`prog-${index}`}
                    className="absolute inset-y-0 end-0 bg-walnut"
                    style={{
                      animation: `progress-fill ${DURATION_MS}ms linear forwards`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                    onAnimationEnd={advance}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
