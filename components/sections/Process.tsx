'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { ProcessContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function Process({ eyebrow, stages }: ProcessContent) {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  /* Scroll-linked connector line fill */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.25'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="bg-sand py-section-lg" aria-labelledby="process-heading">
      <div className="max-w-container mx-auto px-[6vw]">
        <h2 id="process-heading" className="text-small text-taupe tracking-[0.08em] mb-16">
          {eyebrow}
        </h2>

        <div className="flex flex-col relative">
          {/*
            Vertical connector rail — desktop only.
            RTL: start-[49px] = inset-inline-start: 49px = right: 49px
            Horizontally centres inside the 100px number column.
          */}
          <div
            className="absolute inset-y-0 start-[49px] w-px hidden md:block pointer-events-none"
            aria-hidden="true"
          >
            {/* Static track */}
            <div className="absolute inset-0 bg-mushroom" />
            {/* Animated walnut fill */}
            {!reduced && (
              <motion.div
                className="absolute top-0 inset-x-0 bg-walnut/55 origin-top"
                style={{ height: '100%', scaleY: lineScaleY }}
              />
            )}
          </div>

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
                ease: EASE,
                delay: reduced ? 0 : index * 0.08,
              }}
            >
              <div className="flex gap-8 md:gap-12 items-start">
                {/* Number — dir=ltr so "01" stays left-to-right inside RTL */}
                <span
                  dir="ltr"
                  className="tabular-nums font-latin font-light text-walnut leading-none flex-shrink-0 min-w-[100px] text-[5rem] tracking-[0]"
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
