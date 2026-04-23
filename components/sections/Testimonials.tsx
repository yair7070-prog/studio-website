'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { TestimonialsContent } from '@/lib/content/home'

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

  // Auto-advance fallback for reduced-motion (no CSS animation → no onAnimationEnd)
  useEffect(() => {
    if (!multi || !reduced || paused) return
    const id = setInterval(advance, DURATION_MS)
    return () => clearInterval(id)
  }, [multi, reduced, paused, advance])

  return (
    <section className="bg-bone py-section-lg">
      <div className="max-w-container mx-auto px-[6vw]">
        <p className="text-small text-taupe tracking-[0.08em] mb-24">{eyebrow}</p>

        <div
          className="max-w-[680px] mx-auto text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reduced ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: 'linear' }}
            >
              <p className="font-serif text-display-l text-espresso" style={{ lineHeight: 1.3 }}>
                {item.text}
              </p>
              <p className="mt-12 text-small text-taupe">
                {item.name} · {item.location} · <span dir="ltr" className="tabular-nums">{item.year}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          {multi && (
            <div className="mt-16">
              {/* Chevrons — RTL: DOM order [prev ›, ‹ next] → RTL flex renders › on right, ‹ on left */}
              <div className="flex items-center justify-center gap-8">
                <button
                  aria-label="הקודם"
                  onClick={() => setIndex(i => (i - 1 + items.length) % items.length)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  className="flex items-center justify-center w-11 h-11 text-taupe hover:text-walnut transition-colors duration-300 ease-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2"
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
                  className="flex items-center justify-center w-11 h-11 text-taupe hover:text-walnut transition-colors duration-300 ease-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2"
                >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                    <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Progress hairline — CSS animation; fills from reading-start (end-0 = right in RTL) */}
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
