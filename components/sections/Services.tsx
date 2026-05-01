'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { ServiceCategory, ServiceTrack } from '@/lib/content/home'
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

interface ServicesProps {
  categories: ServiceCategory[]
}

function TrackCard({ track }: { track: ServiceTrack }) {
  return (
    <article className="flex flex-col">
      {/* L/M/S size badge — walnut disc with bone serif letter. */}
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-walnut flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="font-serif text-headline-m text-bone leading-none">{track.sizeTier}</span>
      </div>

      {/* Title */}
      <h3 className="mt-6 font-serif text-headline-m text-espresso">{track.title}</h3>

      {/* Teaser — short walnut subtitle */}
      <p className="mt-2 font-serif text-body-m text-walnut">{track.teaser}</p>

      {/* Description — body taupe, max-w to bound line length */}
      <p className="mt-4 font-serif text-body-l text-taupe leading-relaxed max-w-[42ch]">
        {track.description}
      </p>

      {/* Included bullets */}
      <p className="mt-6 text-small text-taupe tracking-[0.08em] mb-3">{track.includedHeading}</p>
      <ul className="space-y-2.5">
        {track.includedBullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-walnut mt-2.5 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="font-serif text-body-m text-taupe leading-relaxed flex-1">
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA — anchors to FinalCTA's #lead-form */}
      <a
        href="#lead-form"
        className="self-start inline-block mt-8 px-6 py-3 border border-walnut text-small font-serif text-walnut tracking-[0.08em] hover:bg-walnut hover:text-bone transition-colors duration-300 ease-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand cursor-pointer"
      >
        לפרטים נוספים
      </a>
    </article>
  )
}

function CategoryBlock({ category, reduced }: { category: ServiceCategory; reduced: boolean }) {
  return (
    <motion.div
      className="mb-24 last:mb-0"
      variants={revealContainer}
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-15%' }}
    >
      <motion.p variants={revealItem} className="text-small text-taupe tracking-[0.08em]">
        {category.eyebrow}
      </motion.p>
      <motion.h2 variants={revealItem} className="mt-3 font-serif text-display-l text-espresso">
        {category.heading}
      </motion.h2>
      <motion.p variants={revealItem} className="mt-4 font-serif text-body-l text-taupe max-w-[60ch]">
        {category.subheading}
      </motion.p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {category.tracks.map((track) => (
          <motion.div key={track.id} variants={revealItem}>
            <TrackCard track={track} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function Services({ categories }: ServicesProps) {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const swatchesY = useTransform(scrollYProgress, [0, 1], ['-12px', '12px'])

  return (
    <section ref={sectionRef} className="bg-sand py-section-lg relative overflow-hidden" aria-label="שירותים">

      {/* Section sketch — absolute top-left, desktop only, z-0 behind content */}
      <div
        className="absolute hidden md:block pointer-events-none z-0"
        style={{ left: '4vw', top: '8%', width: '10%', opacity: 0.85 }}
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
          bottom: '4%',
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
          style={{ filter: 'sepia(0.18) brightness(1.02) saturate(0.95) drop-shadow(0 10px 28px rgba(43,36,32,0.17))' }}
        />
      </motion.div>

      <div className="max-w-container mx-auto px-[6vw] relative z-10">
        {categories.map((category) => (
          <CategoryBlock key={category.id} category={category} reduced={!!reduced} />
        ))}
      </div>
    </section>
  )
}
