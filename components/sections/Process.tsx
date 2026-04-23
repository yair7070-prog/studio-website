'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ProcessContent } from '@/lib/content/home'

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function Process({ eyebrow, stages }: ProcessContent) {
  const reduced = useReducedMotion()

  return (
    <section className="bg-sand py-section-lg">
      <div className="max-w-container mx-auto px-[6vw]">
        <p className="text-small text-taupe tracking-[0.08em] mb-16">{eyebrow}</p>

        <div className="flex flex-col">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.number}
              className={index > 0 ? 'mt-section-sm' : ''}
              variants={VARIANTS}
              initial={reduced ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-20%' }}
              transition={{
                duration: 0.6,
                ease: [0.22, 0.61, 0.36, 1],
                delay: reduced ? 0 : index * 0.08,
              }}
            >
              <div className="flex gap-8 md:gap-12 items-start">
                {/* Number — dir=ltr so "01" renders left-to-right inside RTL page */}
                <span
                  dir="ltr"
                  className="tabular-nums font-latin font-light text-walnut leading-none flex-shrink-0 min-w-[100px] text-[5rem] tracking-[-0.02em]"
                >
                  {stage.number}
                </span>

                {/* Content */}
                <div className="pt-3">
                  <p className="font-serif text-headline-m text-espresso">{stage.title}</p>
                  <p className="mt-3 font-serif text-body-l text-espresso max-w-[52ch]">
                    {stage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
