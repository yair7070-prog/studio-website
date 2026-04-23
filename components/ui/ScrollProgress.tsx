'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null
  if (reduced) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: 2,
        background: '#8B6B4A',
        transformOrigin: 'right',
        scaleX: scrollYProgress,
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    />
  )
}
