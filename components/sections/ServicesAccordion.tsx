'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import type { ServicesContent } from '@/lib/content/home'
import { MIXED_MEDIA } from '@/lib/assets/mixedMedia'

const EASE = [0.22, 0.61, 0.36, 1] as const

const revealContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const revealItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const PANEL_LABELS = {
  included: 'כולל',
  timeline: 'משך זמן משוער',
  start: 'איך מתחילים',
} as const

export function ServicesAccordion({ eyebrow, items }: ServicesContent) {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const swatchesY = useTransform(scrollYProgress, [0, 1], ['-12px', '12px'])

  return (
    <section ref={sectionRef} className="bg-sand py-section-lg relative overflow-hidden" aria-labelledby="services-heading">

      {/* Section sketch — absolute top-left, desktop only, z-0 behind content */}
      <div
        className="absolute hidden md:block pointer-events-none z-0"
        style={{ left: '4vw', top: '20%', width: '10%', opacity: 0.85 }}
        aria-hidden="true"
      >
        <Image
          src={MIXED_MEDIA.marks.sectionSketch.src}
          alt=""
          width={MIXED_MEDIA.marks.sectionSketch.width}
          height={MIXED_MEDIA.marks.sectionSketch.height}
          className="w-full h-auto"
        />
      </div>

      {/* Swatches — absolute bottom-left, parallax 1.04x, rotation -2deg */}
      <motion.div
        className="absolute hidden md:block pointer-events-none z-0"
        style={{
          left: '6vw',
          bottom: '8%',
          width: '13%',
          rotate: -2,
          y: reduced ? '0px' : swatchesY,
        }}
        aria-hidden="true"
      >
        <Image
          src={MIXED_MEDIA.process.swatchesArranging.src}
          alt=""
          width={MIXED_MEDIA.process.swatchesArranging.width}
          height={MIXED_MEDIA.process.swatchesArranging.height}
          className="w-full h-auto"
          style={{ filter: 'sepia(0.18) brightness(1.02) saturate(0.95) drop-shadow(0 4px 16px rgba(43,36,32,0.14))' }}
        />
      </motion.div>

      <div className="max-w-container mx-auto px-[6vw] relative z-10">

        <motion.div
          variants={revealContainer}
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
          <motion.h2 id="services-heading" variants={revealItem} className="text-small text-taupe tracking-[0.08em] mb-12">
            {eyebrow}
          </motion.h2>

          <Accordion.Root type="single" collapsible className="border-t border-mushroom">
            {items.map((item) => (
              <motion.div key={item.id} variants={revealItem}>
                <Accordion.Item
                  value={item.id}
                  className="border-b border-mushroom transition-colors duration-[400ms] ease-paper data-[state=open]:bg-mushroom/30"
                >
                  <Accordion.Header className="flex">
                    <Accordion.Trigger className="group relative flex w-full items-center justify-between py-8 md:py-10 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand cursor-pointer">

                      {/* Title — reading-start (right in RTL) */}
                      <span className="font-serif text-headline-m text-espresso group-hover:text-walnut transition-colors duration-200 ease-paper">
                        {item.title}
                      </span>

                      {/* Teaser — centered, desktop only */}
                      <span className="absolute left-1/2 -translate-x-1/2 hidden md:block font-serif text-body-m text-taupe whitespace-nowrap pointer-events-none select-none">
                        {item.teaser}
                      </span>

                      {/* Plus → × icon — reading-end (left in RTL), rotates 45° on open */}
                      <span
                        className="ms-6 flex-shrink-0 text-taupe group-hover:text-walnut group-data-[state=open]:rotate-45 group-data-[state=open]:text-walnut motion-reduce:transition-none"
                        style={{
                          transition:
                            'transform 500ms cubic-bezier(0.22, 0.61, 0.36, 1), color 200ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                        }}
                        aria-hidden="true"
                      >
                        {/* 16×16 plus — rotated 45° it becomes × */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <line
                            x1="8" y1="0" x2="8" y2="16"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          />
                          <line
                            x1="0" y1="8" x2="16" y2="8"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          />
                        </svg>
                      </span>

                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="accordion-panel overflow-hidden">
                    <div className="py-10 pe-16 flex flex-col gap-8">

                      <div>
                        <p className="text-small text-taupe tracking-[0.08em] mb-3">
                          {PANEL_LABELS.included}
                        </p>
                        <p className="font-serif text-body-l text-espresso">{item.included}</p>
                      </div>

                      <div>
                        <p className="text-small text-taupe tracking-[0.08em] mb-3">
                          {PANEL_LABELS.timeline}
                        </p>
                        <p className="font-serif text-body-l text-espresso">{item.timeline}</p>
                      </div>

                      <div>
                        <p className="text-small text-taupe tracking-[0.08em] mb-3">
                          {PANEL_LABELS.start}
                        </p>
                        <p className="font-serif text-body-l text-espresso">{item.start}</p>
                      </div>

                    </div>
                  </Accordion.Content>

                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>

      </div>
    </section>
  )
}
