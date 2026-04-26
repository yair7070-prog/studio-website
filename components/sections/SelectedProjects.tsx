'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { ProjectsContent, ProjectItem } from '@/lib/content/home'
import { MIXED_MEDIA } from '@/lib/assets/mixedMedia'

const EASE = [0.22, 0.61, 0.36, 1] as const
const OVERLAY_SHADOW = 'drop-shadow(0 4px 16px rgba(43, 36, 32, 0.18))'

type OverlayPosition = {
  width: string
  rotate: number
  top?: string
  bottom?: string
  left?: string
  right?: string
}

type ProjectAssetSet = {
  hero: { src: string; width: number; height: number; alt: string }
  overlays: Record<string, { src: string; width: number; height: number; alt: string }>
}

// Per-project overlay positioning recipes — wide-bleed layout (Wave F).
// Positions are relative to the OUTER wrapper which is 148% of column width
// on desktop (md+) via -mx-[24%]. Inner image is 60% of outer (~89% of
// column). Per-side gutter is ~30% of column. Overlays at left/right 2%
// sit ~4% inside the gutter — close to the photo without touching it.
// Keys MUST match MIXED_MEDIA.projects[id].overlays.
const OVERLAY_LAYOUT: Record<string, Record<string, OverlayPosition>> = {
  'apartment-tel-aviv': {
    floorplanCard: { width: '24%', rotate: -2,   top: '8%',     left: '2%' },
    annotation:    { width: '20%', rotate: -1,   top: '50%',    right: '2%' },
    swatches:      { width: '24%', rotate: 3,    bottom: '12%', left: '2%' },
  },
  'house-hasharon': {
    elevation:     { width: '28%', rotate: -1.5, top: '8%',     left: '2%' },
    annotation:    { width: '20%', rotate: 1,    top: '50%',    right: '2%' },
    swatches:      { width: '24%', rotate: -2,   bottom: '12%', left: '2%' },
  },
  'apartment-herzliya': {
    beforeInset:   { width: '26%', rotate: -3,   top: '8%',     left: '2%' },
  },
  'apartment-raanana': {
    beforeInset:   { width: '26%', rotate: 2,    top: '8%',     right: '2%' },
    swatches:      { width: '24%', rotate: -2,   bottom: '12%', left: '2%' },
  },
}

// Caption-sheet visual selection per project (Wave G). The named overlay key
// is rendered inline inside each tile's caption sheet; the position data in
// OVERLAY_LAYOUT is no longer consumed for absolute positioning, but the
// rotate value is still read from OVERLAY_LAYOUT[id][captionVisualKey].
// Separate map (not a key in OVERLAY_LAYOUT) so the layout type stays clean.
const CAPTION_VISUAL_BY_PROJECT: Record<string, string> = {
  'apartment-tel-aviv':  'floorplanCard',
  'house-hasharon':      'elevation',
  'apartment-herzliya':  'beforeInset',
  'apartment-raanana':   'beforeInset',
}

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
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
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
  const reduced   = useReducedMotion()

  useFocusTrap(dialogRef, true, onClose)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    /* Backdrop — fades in/out */
    <motion.div
      className="fixed inset-0 z-50 bg-espresso/90 flex items-start justify-center p-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
      onClick={onClose}
      role="presentation"
    >
      {/* Dialog — scale + fade in from below */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-3xl my-auto py-8"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 8 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">{project.name}</h2>

        {/* Close — top-end */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-small text-bone hover:text-walnut transition-colors duration-300 ease-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-espresso cursor-pointer"
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
      </motion.div>
    </motion.div>
  )
}

// ─── SelectedProjects ─────────────────────────────────────

export function SelectedProjects({ eyebrow, items }: ProjectsContent) {
  const reduced = useReducedMotion()
  const [openProject,  setOpenProject]  = useState<ProjectItem | null>(null)
  const [hoveredTile,  setHoveredTile]  = useState<string | null>(null)
  const triggerRef  = useRef<HTMLButtonElement | null>(null)
  const wasOpenRef  = useRef(false)

  const openModal = useCallback((item: ProjectItem, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget
    setOpenProject(item)
  }, [])

  const closeModal = useCallback(() => setOpenProject(null), [])

  /* Restore focus to originating tile on close */
  useEffect(() => {
    if (wasOpenRef.current && !openProject) triggerRef.current?.focus()
    wasOpenRef.current = !!openProject
  }, [openProject])

  return (
    <section className="bg-bone py-section-lg" aria-labelledby="projects-heading">
      <div className="max-w-container mx-auto px-[6vw]">
        <motion.h2
          id="projects-heading"
          className="text-small text-taupe tracking-[0.08em] mb-16"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {eyebrow}
        </motion.h2>

        {/*
          RTL 2-col grid: col 1 = right (reading-start), col 2 = left (reading-end).
          Items at even index (0, 2) land in col 1; odd (1, 3) in col 2 with +120px offset.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-[120px]">
          {items.map((item, index) => {
            const delay    = (Math.floor(index / 2) * 80 + (index % 2 === 1 ? 120 : 0)) / 1000
            const isHovered = hoveredTile === item.id
            return (
              <motion.div
                key={item.id}
                className={index % 2 === 1 ? 'md:pt-[120px]' : ''}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.65, delay, ease: EASE }}
              >
                <button
                  onClick={e => openModal(item, e)}
                  onMouseEnter={() => !reduced && setHoveredTile(item.id)}
                  onMouseLeave={() => setHoveredTile(null)}
                  aria-haspopup="dialog"
                  className="group w-full text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-4 cursor-pointer"
                >
                  {/* Label */}
                  <p className="text-small text-taupe tracking-[0.08em] mb-3">
                    {item.label.text}
                  </p>

                  {/* Photograph (Wave G — caption-sheet architecture).
                      Photo occupies full column width; no bleed margin, no
                      absolute-positioned overlays. Editorial documentation
                      (blueprint/elevation/before-inset) lives in the caption
                      sheet rendered below. */}
                  {(() => {
                    const projectAssets = (MIXED_MEDIA.projects as Record<string, ProjectAssetSet | undefined>)[item.id]
                    const captionVisualKey = CAPTION_VISUAL_BY_PROJECT[item.id]
                    const captionVisualAsset = captionVisualKey ? projectAssets?.overlays[captionVisualKey] : undefined
                    const captionVisualRotate = captionVisualKey
                      ? OVERLAY_LAYOUT[item.id]?.[captionVisualKey]?.rotate ?? 0
                      : 0
                    return (
                      <>
                        <div className="relative">
                          <div className="aspect-[4/5] bg-mushroom relative overflow-hidden">
                            {projectAssets && (
                              <motion.div
                                className="absolute inset-0"
                                animate={{ scale: isHovered && !reduced ? 1.02 : 1 }}
                                transition={{ duration: 0.7, ease: EASE }}
                              >
                                <Image
                                  src={projectAssets.hero.src}
                                  alt={projectAssets.hero.alt}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  className="object-cover"
                                />
                              </motion.div>
                            )}

                            {/* Walnut hairline — draws from reading-start (right in RTL) on hover */}
                            <motion.div
                              className="absolute bottom-0 inset-x-0 h-px bg-walnut z-10"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: isHovered ? 1 : 0 }}
                              transition={{ duration: isHovered ? 0.5 : 0.4, ease: EASE }}
                              style={{ transformOrigin: 'right center' }}
                            />
                          </div>
                        </div>

                        {/* Caption sheet — sits below the photo. Two-column grid on desktop:
                            visual on the reading-start side (RTL: right), text on the
                            reading-end side (RTL: left). Stacks on mobile. */}
                        <div className="mt-6 md:mt-8">
                          <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-y-4 md:gap-x-6 md:items-center">
                            {/* Caption visual — blueprint / elevation / before-inset.
                                Native aspect preserved, slight rotation per OVERLAY_LAYOUT,
                                drop shadow per OVERLAY_SHADOW. Centered + 50% width on
                                mobile; full column width on desktop. */}
                            <div className="max-w-[50%] mx-auto md:max-w-none md:mx-0 mb-4 md:mb-0">
                              {captionVisualAsset && (
                                <div
                                  style={{
                                    transform: `rotate(${captionVisualRotate}deg)`,
                                    filter: OVERLAY_SHADOW,
                                  }}
                                >
                                  <Image
                                    src={captionVisualAsset.src}
                                    alt={captionVisualAsset.alt}
                                    width={captionVisualAsset.width}
                                    height={captionVisualAsset.height}
                                    className="w-full h-auto"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Caption text — project name, metadata, conditional Line 2. */}
                            <div>
                              <p
                                className={[
                                  'font-serif text-headline-m transition-colors duration-300 ease-paper',
                                  isHovered ? 'text-walnut' : 'text-espresso',
                                ].join(' ')}
                              >
                                {item.name}
                              </p>
                              <p className="mt-2 text-small text-taupe">{item.metadata}</p>
                              {item.id === 'apartment-herzliya' && (
                                <p className="mt-3 font-serif text-body-m text-walnut tracking-[0.06em]">
                                  לפני · 2025 — לקראת סיום · 2026
                                </p>
                              )}
                              {item.id === 'apartment-raanana' && (
                                <p className="mt-3 font-serif text-body-m text-walnut tracking-[0.06em]">
                                  לפני · 2024 — הושלם · 2024
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* AnimatePresence enables exit animations on the lightbox */}
      <AnimatePresence>
        {openProject && (
          <Lightbox
            key={openProject.id}
            project={openProject}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
