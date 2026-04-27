'use client'

import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea'
const EASE_PAPER = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

export function Cursor() {
  const [mounted,      setMounted]      = useState(false)
  const [reduced,      setReduced]      = useState(false)
  const [pointerFine,  setPointerFine]  = useState(false)
  const [hover,        setHover]        = useState(false)
  const [down,         setDown]         = useState(false)
  const [hiddenByData, setHiddenByData] = useState(false)
  const elRef  = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // Mount + media-query state. Listens to runtime changes (Wave K).
  useEffect(() => {
    setMounted(true)
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerMq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setReduced(reducedMq.matches)
    setPointerFine(pointerMq.matches)
    const onReducedChange = () => setReduced(reducedMq.matches)
    const onPointerChange = () => setPointerFine(pointerMq.matches)
    reducedMq.addEventListener('change', onReducedChange)
    pointerMq.addEventListener('change', onPointerChange)
    return () => {
      reducedMq.removeEventListener('change', onReducedChange)
      pointerMq.removeEventListener('change', onPointerChange)
    }
  }, [])

  // Dot+ring follower — gated on hover-capable + fine pointer.
  // Tracking, hover detection, press state. Preserves Wave-prior tracking
  // logic (RAF batching on mousemove) verbatim.
  useEffect(() => {
    if (!mounted) return
    if (!pointerFine) return

    document.documentElement.style.cursor = 'none'

    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!elRef.current) return
        // Wave L: elRef now points to the wrapper, which has no size.
        // Children handle their own centering via translate(-50%, -50%).
        elRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`
      })
      const target = e.target as Element | null
      if (!target) return
      // data-cursor opt-in hook (Wave K). Defined values: 'default', 'hidden'.
      // Unknown values are tolerated (no error, fallthrough to default behavior).
      const dataCursorEl = target.closest?.('[data-cursor]') as Element | null
      const dataCursorValue = dataCursorEl?.getAttribute('data-cursor') ?? null
      const hidden = dataCursorValue === 'hidden'
      setHiddenByData(hidden)
      const interactive = !!(target.matches?.(INTERACTIVE) || target.closest?.(INTERACTIVE))
      setHover(!hidden && interactive)
    }

    function onDown() { setDown(true)  }
    function onUp()   { setDown(false) }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)

    return () => {
      document.documentElement.style.cursor = ''
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
    }
  }, [mounted, pointerFine])

  // Tap ripple — touch-only, suppressed under reduced-motion (Wave K).
  // Mounts independently of pointerFine so touch devices get tap feedback
  // even though the dot+ring follower above is hidden for them.
  useEffect(() => {
    if (!mounted) return
    if (reduced) return

    const ACTIVE_RIPPLES = new WeakMap<Element, number>()
    const MAX_RIPPLES = 3
    const RIPPLE_DURATION_MS = 400

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType !== 'touch') return

      const target = e.target as Element | null
      const interactiveEl = target?.closest?.(INTERACTIVE) as HTMLElement | null
      if (!interactiveEl) return

      // Element must be a positioning context for the absolute ripple to anchor.
      // Skip + warn if static — production should mark interactive elements.
      const cs = window.getComputedStyle(interactiveEl)
      if (cs.position === 'static') {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.warn('[Cursor] tap ripple skipped — element has position: static', interactiveEl)
        }
        return
      }

      const inFlight = ACTIVE_RIPPLES.get(interactiveEl) ?? 0
      if (inFlight >= MAX_RIPPLES) return

      const rect = interactiveEl.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      // Diameter = 2 × max distance from touch point to any corner.
      // Guarantees the ripple fills the element from any tap location.
      const maxRadius = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y),
      )
      const diameter = maxRadius * 2

      const ripple = document.createElement('span')
      ripple.className = 'aw-tap-ripple'
      ripple.style.left   = `${x - diameter / 2}px`
      ripple.style.top    = `${y - diameter / 2}px`
      ripple.style.width  = `${diameter}px`
      ripple.style.height = `${diameter}px`

      interactiveEl.appendChild(ripple)
      ACTIVE_RIPPLES.set(interactiveEl, inFlight + 1)

      window.setTimeout(() => {
        ripple.remove()
        const remaining = (ACTIVE_RIPPLES.get(interactiveEl) ?? 1) - 1
        if (remaining <= 0) ACTIVE_RIPPLES.delete(interactiveEl)
        else ACTIVE_RIPPLES.set(interactiveEl, remaining)
      }, RIPPLE_DURATION_MS)
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [mounted, reduced])

  // Render the dot+ring follower only on hover-capable, fine-pointer devices.
  // Tap-ripple effect above is unconditional w.r.t. this gate.
  if (!mounted) return null
  if (!pointerFine) return null

  // States (Wave L bumps press size + adds outer press ring; resting and
  // hover preserved verbatim):
  //   resting (down=false, hover=false): 6×6 walnut disc, opacity 0.7,  mix-blend-difference
  //   hover   (down=false, hover=true):  24×24 transparent ring,         mix-blend-difference
  //   press   (down=true):               18×18 espresso disc, opacity 1, mix-blend NORMAL
  //                                      + 28×28 walnut outer ring at opacity 0.15, mix-blend NORMAL
  const size = down ? 18 : hover ? 24 : 6
  // Press transitions faster (140ms); hover/resting at 200ms (Wave K).
  // Reduced-motion: instant (0ms) — geometry/color shifts still happen but
  // without animation. Tracking continues at RAF rate (no easing involved).
  const stateDuration     = reduced ? '0ms' : down ? '140ms' : '200ms'
  const transformDuration = reduced ? '0ms' : '200ms'

  const innerDotStyle = down
    ? { background: '#2B2420',     border: 'none',                 opacity: 1,    mixBlendMode: 'normal'     as const }
    : hover
    ? { background: 'transparent', border: '1px solid #8B6B4A',    opacity: 0.25, mixBlendMode: 'difference' as const }
    : { background: '#8B6B4A',     border: 'none',                 opacity: 0.7,  mixBlendMode: 'difference' as const }

  return (
    /* Wrapper — position-tracking anchor only, no size. Children center
       themselves via translate(-50%, -50%) on the wrapper's origin. */
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 10000,
        display: hiddenByData ? 'none' : 'block',
        transform: 'translate(-100px, -100px)',
        transition: `transform ${transformDuration} ${EASE_PAPER}`,
      }}
    >
      {/* Outer press ring (Wave L) — always mounted, opacity-toggled.
          28×28 walnut border at 0.15 opacity when pressed; invisible
          (opacity 0) otherwise. mix-blend normal during press to read
          as a unified gesture with the inner espresso dot. JSX-ordered
          first so it paints below the inner dot without needing z-index. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'transparent',
          border: '1px solid #8B6B4A',
          opacity: down ? 0.15 : 0,
          mixBlendMode: 'normal',
          pointerEvents: 'none',
          transition: `opacity ${stateDuration} ${EASE_PAPER}`,
        }}
      />

      {/* Inner dot — the existing single element, now centered on the
          wrapper's origin instead of using its own translate offset. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: size,
          height: size,
          borderRadius: '50%',
          pointerEvents: 'none',
          transition:
            `width ${stateDuration} ${EASE_PAPER}, ` +
            `height ${stateDuration} ${EASE_PAPER}, ` +
            `background ${stateDuration} ${EASE_PAPER}, ` +
            `border ${stateDuration} ${EASE_PAPER}, ` +
            `opacity ${stateDuration} ${EASE_PAPER}`,
          ...innerDotStyle,
        }}
      />
    </div>
  )
}
