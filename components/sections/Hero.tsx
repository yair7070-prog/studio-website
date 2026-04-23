'use client'

import { useEffect, useRef } from 'react'
import Logomark from '@/components/brand/Logomark'
import type { HeroContent } from '@/lib/content/home'

export function Hero({ positioning, cta, imageAlt, imageLabel }: HeroContent) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.style.opacity = '1'
      return
    }
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 800ms cubic-bezier(0.22, 0.61, 0.36, 1)'
      el.style.opacity = '1'
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={ref}
      style={{ opacity: 0 }}
      className="relative min-h-[100svh] overflow-hidden bg-mushroom"
      aria-label={imageAlt}
    >
      {/* Logomark — top-left in RTL (end = left) */}
      <div className="absolute top-0 end-0 pe-[8vw] pt-[6vw] md:pe-[6vw]">
        <div className="flex flex-col items-end gap-2">
          <Logomark variant="original" size={56} />
          <span className="sr-only">a.w interior design — Adi Weinstein</span>
        </div>
      </div>

      {/* Content block — bottom-right in RTL (start = right) */}
      <div className="absolute bottom-0 start-0 ps-[8vw] pb-[8vw] md:ps-[6vw] md:pb-[6vw] max-w-[42rem]">
        {imageLabel && (
          <p
            className={
              imageLabel.lang === 'en'
                ? 'font-latinSans uppercase text-label tracking-[0.12em] text-taupe mb-4'
                : 'font-sans text-label tracking-[0.08em] text-taupe mb-4'
            }
          >
            {imageLabel.text}
          </p>
        )}
        <h1 className="font-serif text-display-xl text-espresso mb-8">{positioning}</h1>
        <a
          href="#contact"
          className="group relative inline-block font-serif text-body-l text-espresso"
        >
          {cta}
          <span className="absolute -bottom-px end-0 h-px w-0 bg-espresso group-hover:w-full transition-[width] duration-300 ease-paper motion-reduce:transition-none" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-px h-12 bg-taupe opacity-40" />
    </section>
  )
}
