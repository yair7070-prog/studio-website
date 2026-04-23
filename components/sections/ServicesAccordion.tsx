'use client'

import { motion, useReducedMotion } from 'framer-motion'
import * as Accordion from '@radix-ui/react-accordion'
import type { ServicesContent } from '@/lib/content/home'

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

  return (
    <section className="bg-sand py-section-lg">
      <div className="max-w-container mx-auto px-[6vw]">

        <motion.div
          variants={revealContainer}
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
        >
          <motion.p variants={revealItem} className="text-small text-taupe tracking-[0.08em] mb-12">
            {eyebrow}
          </motion.p>

          <Accordion.Root type="single" collapsible className="border-t border-mushroom">
            {items.map((item) => (
              <motion.div key={item.id} variants={revealItem}>
                <Accordion.Item
                  value={item.id}
                  className="border-b border-mushroom transition-colors duration-[400ms] ease-paper data-[state=open]:bg-mushroom/30"
                >
                  <Accordion.Header className="flex">
                    <Accordion.Trigger className="group relative flex w-full items-center justify-between py-8 md:py-10 text-start focus:outline-none">

                      {/* Title — reading-start (right in RTL) */}
                      <span className="font-serif text-headline-m text-espresso group-hover:text-walnut transition-colors duration-200 ease-paper">
                        {item.title}
                      </span>

                      {/* Teaser — centered, desktop only */}
                      <span className="absolute left-1/2 -translate-x-1/2 hidden md:block font-serif text-body-m text-taupe whitespace-nowrap pointer-events-none select-none">
                        {item.teaser}
                      </span>

                      {/* Icon — reading-end (left in RTL), rotates on open */}
                      <span
                        className="ms-6 flex-shrink-0 text-taupe group-hover:text-walnut group-data-[state=open]:rotate-45 group-data-[state=open]:text-walnut motion-reduce:transition-none"
                        style={{ transition: 'transform 500ms cubic-bezier(0.22, 0.61, 0.36, 1), color 200ms cubic-bezier(0.22, 0.61, 0.36, 1)' }}
                        aria-hidden="true"
                      >
                        <svg
                          width="24"
                          height="2"
                          viewBox="0 0 24 2"
                          fill="none"
                        >
                          <line
                            x1="0"
                            y1="1"
                            x2="24"
                            y2="1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
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
