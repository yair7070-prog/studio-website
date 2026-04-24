'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import type { AboutContent } from '@/lib/content/home'

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const BASE_TRANSITION = {
  duration: 0.6,
  ease: [0.22, 0.61, 0.36, 1] as const,
}

// Each word is its own component so useTransform is called at component
// top-level (React rules of hooks prohibit hook calls inside .map()).
function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = 0.1 + (index / total) * 0.6
  const end = 0.15 + (index / total) * 0.6
  const opacity = useTransform(progress, [start, end], [0.3, 1.0])
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  )
}

export function About({ paragraph, portraitAlt, signature, tagline }: AboutContent) {
  // All hooks unconditionally at top level
  const reduced = useReducedMotion()
  const aboutRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  // mounted flag — same pattern as IntroLoader and Cursor.
  // Scroll-linked styles and word reveal only activate after mount so that
  // the SSR output (no scroll state) matches the client first-paint exactly.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Portrait Y parallax (pre-existing, SSR-safe: y at scroll=0 is '24px'
  // which Framer Motion serializes consistently on server and client)
  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  })
  const portraitY = useTransform(portraitProgress, [0, 1], ['24px', '-24px'])

  // Section-wide progress — only consumed after mount to prevent mismatch
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end center'],
  })
  const portraitScale = useTransform(aboutProgress, [0, 0.5], [0.94, 1.0])
  const portraitSaturation = useTransform(aboutProgress, [0, 0.5], [0.85, 1.0])
  const portraitFilter = useMotionTemplate`saturate(${portraitSaturation})`

  const initial = reduced ? 'visible' : 'hidden'
  const words = paragraph.split(' ')

  // After mount and no reduced-motion preference: activate scroll animations.
  // Before mount (SSR + first client paint): render exactly what existed
  // before these scroll features were added — no mismatch possible.
  const animate = mounted && !reduced

  return (
    <section ref={aboutRef} className="bg-bone py-section-lg" aria-labelledby="about-heading">
      <h2 id="about-heading" className="sr-only">על הסטודיו</h2>
      <div className="max-w-container mx-auto px-[6vw]">
        {/*
          RTL 12-col grid: col line 1 = right edge.
          Text at cols 2-6 (reading-start, right side).
          Portrait at cols 8-11 (reading-end, left side).
        */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-y-0">

          {/* Text block — reading-start (right in RTL) */}
          <motion.div
            className="col-span-12 md:col-start-2 md:col-span-5 flex flex-col"
            variants={VARIANTS}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, margin: '-20%' }}
            transition={BASE_TRANSITION}
          >
            <p className="font-serif text-body-l text-espresso max-w-[52ch]">
              {animate
                ? words.map((word, i) => (
                    <Word
                      key={i}
                      word={word}
                      index={i}
                      total={words.length}
                      progress={aboutProgress}
                    />
                  ))
                : paragraph}
            </p>
            <p
              className="mt-12 font-latin font-light text-display-l text-walnut tracking-[0.04em]"
              aria-label={signature}
            >
              {signature}
            </p>
            <p className="mt-12 font-serif text-body-m text-taupe tracking-[0.04em] max-w-[36ch]">
              {tagline}
            </p>
          </motion.div>

          {/* Portrait — reading-end (left in RTL) */}
          <motion.div
            ref={portraitRef}
            className="col-span-12 md:col-start-8 md:col-span-4"
            variants={VARIANTS}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, margin: '-20%' }}
            transition={{ ...BASE_TRANSITION, delay: reduced ? 0 : 0.12 }}
          >
            <motion.div
              className="relative aspect-[4/5] bg-mushroom overflow-hidden"
              role="img"
              aria-label={portraitAlt}
              style={
                reduced
                  ? {}
                  : animate
                  ? { y: portraitY, scale: portraitScale, filter: portraitFilter }
                  : { y: portraitY }
              }
            >
              <span className="absolute top-4 start-4 text-small text-taupe select-none">
                תמונת דיוקן תתווסף
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
