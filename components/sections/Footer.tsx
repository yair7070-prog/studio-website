'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Logomark from '@/components/brand/Logomark'
import type { FooterContent } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Footer({ phone, phoneHref, email, instagram, copyright }: FooterContent) {
  const reduced = useReducedMotion()

  return (
    <motion.footer
      className="bg-sand py-10 border-t border-mushroom"
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="max-w-container mx-auto px-[6vw]">
        {/*
          RTL three-zone row:
            Zone 1 (reading-start = right) — logo
            Zone 2 (center)               — phone / email / instagram
            Zone 3 (reading-end = left)   — copyright
          Mobile: stacks vertically, hairlines hidden.
        */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-0">

          {/* Zone 1: Logo */}
          <div className="flex-shrink-0 md:pe-10">
            <Logomark variant="original" size={48} />
            <span className="sr-only">a.w interior design — Adi Weinstein</span>
          </div>

          {/* Vertical hairline — desktop only */}
          <div className="hidden md:block self-stretch w-px bg-walnut/35" aria-hidden="true" />

          {/* Zone 2: Contact */}
          <div className="flex-1 flex flex-col gap-3 md:flex-row md:items-center md:justify-center md:gap-0">
            <a
              href={phoneHref}
              className="font-serif text-body-s text-taupe hover:text-walnut transition-colors duration-300 ease-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand md:px-6"
            >
              <span dir="ltr" className="tabular-nums">{phone}</span>
            </a>
            <div className="hidden md:block w-px h-4 bg-walnut/30" aria-hidden="true" />
            <a
              href={`mailto:${email}`}
              className="font-serif text-body-s text-taupe hover:text-walnut transition-colors duration-300 ease-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand md:px-6"
            >
              {email}
            </a>
            <div className="hidden md:block w-px h-4 bg-walnut/30" aria-hidden="true" />
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="font-latin text-body-s text-taupe hover:text-walnut transition-colors duration-300 ease-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand md:px-6"
            >
              @a.w_designstudio
            </a>
          </div>

          {/* Vertical hairline — desktop only */}
          <div className="hidden md:block self-stretch w-px bg-walnut/35" aria-hidden="true" />

          {/* Zone 3: Copyright */}
          <div className="flex-shrink-0 md:ps-10">
            <span className="font-latin text-[10px] tracking-[0.14em] uppercase text-taupe/60">
              {copyright}
            </span>
          </div>

        </div>
      </div>
    </motion.footer>
  )
}
