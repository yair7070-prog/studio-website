'use client'

import * as Accordion from '@radix-ui/react-accordion'
import type { ServicesContent } from '@/lib/content/home'

const PANEL_LABELS = {
  included: 'כולל',
  timeline: 'משך זמן משוער',
  start: 'איך מתחילים',
} as const

export function ServicesAccordion({ eyebrow, items }: ServicesContent) {
  return (
    <section className="bg-sand py-section-lg">
      <div className="max-w-container mx-auto px-[6vw]">

        <p className="text-small text-taupe tracking-[0.08em] mb-12">{eyebrow}</p>

        <Accordion.Root type="single" collapsible className="border-t border-mushroom">
          {items.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className="border-b border-mushroom transition-colors duration-[400ms] ease-paper data-[state=open]:bg-mushroom/30"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group relative flex w-full items-center justify-between py-8 md:py-10 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2">

                  {/* Title — reading-start (right in RTL) */}
                  <span className="font-serif text-headline-m text-espresso">
                    {item.title}
                  </span>

                  {/* Teaser — centered, desktop only */}
                  <span className="absolute left-1/2 -translate-x-1/2 hidden md:block font-serif text-body-m text-taupe whitespace-nowrap pointer-events-none select-none">
                    {item.teaser}
                  </span>

                  {/* Icon — reading-end (left in RTL), rotates on open */}
                  <span
                    className="ms-6 flex-shrink-0 text-taupe transition-transform duration-500 ease-paper group-data-[state=open]:rotate-45 motion-reduce:transition-none"
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
          ))}
        </Accordion.Root>

      </div>
    </section>
  )
}
