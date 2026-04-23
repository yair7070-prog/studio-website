'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logomark from '@/components/brand/Logomark'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function IntroLoader() {
  const [show,    setShow]    = useState(false)
  const [logoVis, setLogoVis] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen    = sessionStorage.getItem('intro-seen')
    sessionStorage.setItem('intro-seen', '1')

    if (reduced || seen) {
      sessionStorage.setItem('intro-played', '1')
      window.dispatchEvent(new CustomEvent('intro-fade'))
      return
    }

    setShow(true)

    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setLogoVis(true), 300))
    t.push(setTimeout(() => {
      setFadeOut(true)
      sessionStorage.setItem('intro-played', '1')
      window.dispatchEvent(new CustomEvent('intro-fade'))
    }, 1900))
    t.push(setTimeout(() => setShow(false), 2500))

    return () => t.forEach(clearTimeout)
  }, [])

  if (!show) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bone flex items-center justify-center"
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
        animate={{
          opacity: logoVis ? 1 : 0,
          scale:   logoVis ? 1 : 0.94,
          filter:  logoVis ? 'blur(0px)' : 'blur(6px)',
        }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Logomark variant="original" size={88} />
      </motion.div>
    </motion.div>
  )
}
