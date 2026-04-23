'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea'

export function Cursor() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const [hover,  setHover]  = useState(false)
  const [down,   setDown]   = useState(false)
  const elRef  = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    setActive(true)
    document.documentElement.style.cursor = 'none'

    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (!elRef.current) return
        elRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      })
      const target = e.target as Element
      setHover(!!(target.matches?.(INTERACTIVE) || target.closest?.(INTERACTIVE)))
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
  }, [reduced])

  if (!active) return null

  const size = down ? 4 : hover ? 24 : 6

  return (
    <div
      ref={elRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width:  size,
        height: size,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 10000,
        mixBlendMode: 'difference',
        transform: 'translate(-100px, -100px) translate(-50%, -50%)',
        transition: 'transform 200ms cubic-bezier(0.22, 0.61, 0.36, 1), width 200ms cubic-bezier(0.22, 0.61, 0.36, 1), height 200ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        ...(hover && !down
          ? { background: 'transparent', border: '1px solid #8B6B4A', opacity: 0.25 }
          : { background: '#8B6B4A',     border: 'none',               opacity: down ? 1 : 0.7 }
        ),
      }}
    />
  )
}
