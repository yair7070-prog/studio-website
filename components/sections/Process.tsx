'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { ProcessContent } from '@/lib/content/home'
import { MIXED_MEDIA } from '@/lib/assets/mixedMedia'

const EASE = [0.22, 0.61, 0.36, 1] as const

const VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const DOC_FILTER = 'sepia(0.18) brightness(1.02) saturate(0.95) drop-shadow(0 4px 14px rgba(43,36,32,0.12))'

export function Process({ eyebrow, stages }: ProcessContent) {
  const reduced = useReducedMotion()
  const sectionRef    = useRef<HTMLElement>(null)
  const sketch01Ref   = useRef<HTMLDivElement>(null)
  const floorplanRef  = useRef<HTMLDivElement>(null)
  const annotateRef   = useRef<HTMLDivElement>(null)
  const sketchbookRef = useRef<HTMLDivElement>(null)
  const arrowRef      = useRef<HTMLDivElement>(null)

  /* Scroll-linked connector line fill */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.25'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const { scrollYProgress: sketch01Progress } = useScroll({
    target: sketch01Ref,
    offset: ['start end', 'end start'],
  })
  const sketch01Y = useTransform(sketch01Progress, [0, 1], ['-14px', '14px'])

  const { scrollYProgress: floorplanProgress } = useScroll({
    target: floorplanRef,
    offset: ['start end', 'end start'],
  })
  const floorplanY = useTransform(floorplanProgress, [0, 1], ['-14px', '14px'])

  const { scrollYProgress: annotateProgress } = useScroll({
    target: annotateRef,
    offset: ['start end', 'end start'],
  })
  const annotateY = useTransform(annotateProgress, [0, 1], ['-14px', '14px'])

  const { scrollYProgress: sketchbookProgress } = useScroll({
    target: sketchbookRef,
    offset: ['start end', 'end start'],
  })
  const sketchbookY = useTransform(sketchbookProgress, [0, 1], ['-14px', '14px'])

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

                {/* Content + optional mark/photo */}
                <div className="pt-3 flex-1 flex items-start gap-10">
                  <div className="flex-1">
                    <p className="font-serif text-headline-m text-espresso">{stage.title}</p>
                    <p className="mt-3 font-serif text-body-l text-espresso max-w-[52ch]">
                      {stage.description}
                    </p>
                  </div>

                  {/* Stage 01: curved floor plan sketch */}
                  {index === 0 && (
                    <motion.div
                      ref={sketch01Ref}
                      className="hidden md:block flex-shrink-0 w-[180px] z-20 pointer-events-none"
                      style={{ y: reduced ? '0px' : sketch01Y }}
                      aria-hidden="true"
                    >
                      <Image
                        src={MIXED_MEDIA.marks.floorplanCurved.src}
                        alt=""
                        width={MIXED_MEDIA.marks.floorplanCurved.width}
                        height={MIXED_MEDIA.marks.floorplanCurved.height}
                        className="w-full h-auto"
                        style={{ filter: 'drop-shadow(0 4px 14px rgba(43,36,32,0.10))' }}
                      />
                    </motion.div>
                  )}

                  {/* Stage 02: floorplan-sketching documentary photo */}
                  {index === 1 && (
                    <motion.div
                      ref={floorplanRef}
                      className="hidden md:block flex-shrink-0 w-[180px] z-20 pointer-events-none"
                      style={{ rotate: -1.2, y: reduced ? '0px' : floorplanY }}
                      aria-hidden="true"
                    >
                      <Image
                        src={MIXED_MEDIA.process.floorplanSketching.src}
                        alt=""
                        width={MIXED_MEDIA.process.floorplanSketching.width}
                        height={MIXED_MEDIA.process.floorplanSketching.height}
                        className="w-full h-auto"
                        style={{ filter: DOC_FILTER }}
                      />
                    </motion.div>
                  )}

                  {/* Stage 03: plan-annotating documentary photo */}
                  {index === 2 && (
                    <motion.div
                      ref={annotateRef}
                      className="hidden md:block flex-shrink-0 w-[180px] z-20 pointer-events-none"
                      style={{ rotate: 1.5, y: reduced ? '0px' : annotateY }}
                      aria-hidden="true"
                    >
                      <Image
                        src={MIXED_MEDIA.process.planAnnotating.src}
                        alt=""
                        width={MIXED_MEDIA.process.planAnnotating.width}
                        height={MIXED_MEDIA.process.planAnnotating.height}
                        className="w-full h-auto"
                        style={{ filter: DOC_FILTER }}
                      />
                    </motion.div>
                  )}

                  {/* Stage 04: sketchbook-closing documentary photo */}
                  {index === 3 && (
                    <motion.div
                      ref={sketchbookRef}
                      className="hidden md:block flex-shrink-0 w-[180px] z-20 pointer-events-none"
                      style={{ rotate: -1, y: reduced ? '0px' : sketchbookY }}
                      aria-hidden="true"
                    >
                      <Image
                        src={MIXED_MEDIA.process.sketchbookClosing.src}
                        alt=""
                        width={MIXED_MEDIA.process.sketchbookClosing.width}
                        height={MIXED_MEDIA.process.sketchbookClosing.height}
                        className="w-full h-auto"
                        style={{ filter: DOC_FILTER }}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Circle arrow — centered between stages 03 and 04 */}
              {index === 2 && (
                <div
                  ref={arrowRef}
                  className="hidden md:flex justify-center mt-8 pointer-events-none"
                  aria-hidden="true"
                >
                  <Image
                    src={MIXED_MEDIA.marks.circleArrow.src}
                    alt=""
                    width={MIXED_MEDIA.marks.circleArrow.width}
                    height={MIXED_MEDIA.marks.circleArrow.height}
                    style={{ width: 200, height: 'auto', opacity: 0.85 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
