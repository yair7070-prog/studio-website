'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectsContent, ProjectItem } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

// ─── Focus trap hook ──────────────────────────────────────

function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  onEscape: () => void,
) {
  useEffect(() => {
    if (!active || !ref.current) return
    const el = ref.current
    const focusables = Array.from(
      el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(f => !f.hasAttribute('disabled'))

    focusables[0]?.focus()

    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onEscape(); return }
      if (e.key !== 'Tab') return
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [active, ref, onEscape])
}

// ─── Lightbox ────────────────────────────────────────────

function Lightbox({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId   = `lb-${project.id}`

  useFocusTrap(dialogRef, true, onClose)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 bg-espresso/90 flex items-start justify-center p-6 overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-3xl my-auto py-8"
        onClick={e => e.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">{project.name}</h2>

        {/* Close — top-end */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-small text-bone hover:text-walnut transition-colors duration-300 ease-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
          >
            סגור
          </button>
        </div>

        {/* Images 2×2 (placeholder) */}
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="aspect-[4/5] bg-stone/20 relative overflow-hidden">
              <span className="absolute top-3 start-3 text-small text-stone/60 select-none">
                תמונה תתווסף
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="mt-8 font-serif text-body-l text-bone/80 max-w-[52ch]">
          {project.description}
        </p>
      </div>
    </div>
  )
}

// ─── SelectedProjects ─────────────────────────────────────

export function SelectedProjects({ eyebrow, items }: ProjectsContent) {
  const reduced = useReducedMotion()
  const [openProject, setOpenProject] = useState<ProjectItem | null>(null)
  const triggerRef  = useRef<HTMLButtonElement | null>(null)
  const wasOpenRef  = useRef(false)

  const openModal = useCallback((item: ProjectItem, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget
    setOpenProject(item)
  }, [])

  const closeModal = useCallback(() => setOpenProject(null), [])

  // Restore focus to originating tile on close
  useEffect(() => {
    if (wasOpenRef.current && !openProject) triggerRef.current?.focus()
    wasOpenRef.current = !!openProject
  }, [openProject])

  return (
    <section className="bg-bone py-section-lg">
      <div className="max-w-container mx-auto px-[6vw]">
        <motion.p
          className="text-small text-taupe tracking-[0.08em] mb-16"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {eyebrow}
        </motion.p>

        {/*
          RTL 2-col grid: col 1 = right (reading-start), col 2 = left (reading-end).
          Items at even index (0, 2) land in col 1; odd (1, 3) in col 2 with +120px offset.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-[120px]">
          {items.map((item, index) => {
            const delay = (Math.floor(index / 2) * 80 + (index % 2 === 1 ? 120 : 0)) / 1000
            return (
            <motion.div
              key={item.id}
              className={index % 2 === 1 ? 'md:pt-[120px]' : ''}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay, ease: EASE }}
            >
              <button
                onClick={e => openModal(item, e)}
                aria-haspopup="dialog"
                className="group w-full text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-4"
              >
                {/* Label */}
                <p className="text-small text-taupe tracking-[0.08em] mb-3">
                  {item.label.text}
                </p>

                {/* Image */}
                <div className="aspect-[4/5] bg-mushroom relative overflow-hidden transition-[opacity,transform] duration-[700ms] md:group-hover:opacity-[0.92] md:group-hover:scale-[1.02]">
                  <span className="absolute top-3 start-3 text-small text-taupe select-none">
                    תמונה תתווסף
                  </span>
                </div>

                {/* Name */}
                <p className="mt-6 font-serif text-headline-m text-espresso transition-colors duration-300 md:group-hover:text-walnut">
                  {item.name}
                </p>

                {/* Metadata */}
                <p className="mt-2 text-small text-taupe">{item.metadata}</p>
              </button>
            </motion.div>
            )
          })}
        </div>
      </div>

      {openProject && <Lightbox project={openProject} onClose={closeModal} />}
    </section>
  )
}
