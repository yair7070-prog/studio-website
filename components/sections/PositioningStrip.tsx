'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { PositioningStripContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: EASE } },
}

export function PositioningStrip({ statements }: PositioningStripContent) {
  const reduced = useReducedMotion()

  return (
    <section className="bg-bone py-section-sm" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" className="sr-only">עקרוני הסטודיו</h2>
      <div className="max-w-container mx-auto px-[6vw]">
        <motion.ul
          className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16 list-none m-0 p-0"
          variants={container}
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
          {statements.map((statement, i) => (
            <motion.li
              key={i}
              variants={item}
              className="font-serif text-body-l text-espresso text-center"
            >
              {statement}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
