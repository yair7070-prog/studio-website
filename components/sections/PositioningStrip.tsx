'use client'

import { Fragment, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { PositioningStripContent } from '@/lib/content/home'

/**
 * PositioningStrip — INTENTIONALLY ASSET-FREE.
 *
 * Per design audit 2026-04, this section's power is its typographic
 * authority. Three pillars on a bone bed, no portraits, no marks, no
 * photographs. A prior iteration added a ghosted environmental portrait
 * here; it competed with pillar typography and was reverted.
 *
 * Do not add visual assets to this section in future iterations.
 * If you feel tempted: this section was deliberately solved by removing
 * an asset, not by adding one.
 */

const EASE = [0.22, 0.61, 0.36, 1] as const

// Container just triggers propagation — no staggerChildren, so dividers don't
// corrupt stagger indices. Each content item carries its own explicit delay.
const container = {
  hidden:  {},
  visible: {},
}

// Function variant: custom = item index → explicit delay in ms
const itemVariant = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
}

export function PositioningStrip({ statements }: PositioningStripContent) {
  const reduced = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Divider at position d (between items d and d+1) breathes when
  // either neighbouring item is hovered.
  const dividerBreathes = (d: number) =>
    !reduced && hoveredIndex !== null && (hoveredIndex === d || hoveredIndex === d + 1)

  return (
    <section className="bg-bone py-section-sm border-b border-mushroom/60" aria-labelledby="positioning-heading">
      <h2 id="positioning-heading" className="sr-only">עקרוני הסטודיו</h2>
      <div className="max-w-container mx-auto px-[6vw]">
        <motion.div
          role="list"
          className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-0 md:items-stretch"
          variants={container}
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
          {statements.map((statement, i) => {
            const breathes = i > 0 ? dividerBreathes(i - 1) : false
            return (
              <Fragment key={i}>
                {/* Vertical hairline divider — md+ only, replaces CSS border-s
                    so we can animate scaleY on hover */}
                {i > 0 && (
                  <motion.div
                    className="hidden md:block w-px bg-mushroom self-stretch flex-shrink-0"
                    aria-hidden="true"
                    animate={{ scaleY: breathes ? 0.8 : 1 }}
                    transition={{ duration: breathes ? 0.3 : 0.4, ease: EASE }}
                  />
                )}

                <motion.div
                  role="listitem"
                  custom={i}
                  variants={itemVariant}
                  className="font-serif text-body-l text-espresso text-center md:flex-1 md:px-10 lg:px-14"
                  onMouseEnter={() => !reduced && setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Decorative index numeral — opacity lifts on hover */}
                  <motion.span
                    className="block font-latin font-light text-[1.75rem] leading-none mb-4 select-none tabular-nums"
                    aria-hidden="true"
                    animate={{
                      color:
                        hoveredIndex === i && !reduced
                          ? 'rgba(139,107,74,0.6)'
                          : 'rgba(139,107,74,0.3)',
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <span dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                  </motion.span>
                  {statement}
                </motion.div>
              </Fragment>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
