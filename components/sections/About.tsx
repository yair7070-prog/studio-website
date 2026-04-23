'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { AboutContent } from '@/lib/content/home'

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const BASE_TRANSITION = {
  duration: 0.6,
  ease: [0.22, 0.61, 0.36, 1] as const,
}

export function About({ paragraph, portraitAlt, signature, tagline }: AboutContent) {
  const reduced = useReducedMotion()

  const initial = reduced ? 'visible' : 'hidden'

  return (
    <section className="bg-bone py-section-lg">
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
              {paragraph}
            </p>
            <p
              className="mt-12 font-latin font-light text-display-l text-walnut tracking-[0.02em]"
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
            className="col-span-12 md:col-start-8 md:col-span-4"
            variants={VARIANTS}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true, margin: '-20%' }}
            transition={{ ...BASE_TRANSITION, delay: reduced ? 0 : 0.12 }}
          >
            <div
              className="relative aspect-[4/5] bg-mushroom overflow-hidden"
              role="img"
              aria-label={portraitAlt}
            >
              <span className="absolute top-4 start-4 text-small text-taupe select-none">
                תמונת דיוקן תתווסף
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
