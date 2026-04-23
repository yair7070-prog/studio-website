'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logomark from '@/components/brand/Logomark'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function IntroLoader() {
  const [show,      setShow]      = useState(false)
  const [logoVis,   setLogoVis]   = useState(false)
  const [logoDim,   setLogoDim]   = useState(false)
  const [textPhase, setTextPhase] = useState(false)
  const [fadeOut,   setFadeOut]   = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen    = sessionStorage.getItem('intro-seen')
    sessionStorage.setItem('intro-seen', '1')

    if (reduced || seen) {
      // Not first load, or motion is reduced — skip loader, mark as played
      sessionStorage.setItem('intro-played', '1')
      window.dispatchEvent(new CustomEvent('intro-fade'))
      return
    }

    setShow(true)

    const t: ReturnType<typeof setTimeout>[] = []
    t.push(setTimeout(() => setLogoVis(true),                          300))
    t.push(setTimeout(() => { setLogoDim(true); setTextPhase(true) }, 1700))
    t.push(setTimeout(() => {
      setFadeOut(true)
      sessionStorage.setItem('intro-played', '1')
      window.dispatchEvent(new CustomEvent('intro-fade'))
    }, 2200))
    t.push(setTimeout(() => setShow(false), 2800))

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
      <div className="flex flex-col items-center">
        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
          animate={{
            opacity: logoDim ? 0.4 : (logoVis ? 1 : 0),
            scale:  logoVis ? 1 : 0.94,
            filter: logoVis ? 'blur(0px)' : 'blur(6px)',
          }}
          transition={
            logoDim
              ? { opacity: { duration: 0.5, ease: EASE } }
              : { duration: 0.8, ease: EASE }
          }
        >
          <Logomark variant="original" size={88} />
        </motion.div>

        {/* Hairline — draws from reading-start (right in RTL) to reading-end */}
        <AnimatePresence>
          {textPhase && (
            <div className="relative mt-6" style={{ width: 120, height: 1 }}>
              <motion.div
                key="hairline"
                className="absolute inset-y-0 end-0 h-px bg-walnut"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </div>
          )}
        </AnimatePresence>

        {/* שקט. */}
        <AnimatePresence>
          {textPhase && (
            <motion.p
              key="word"
              className="mt-4 font-serif text-body-m text-taupe tracking-[0.08em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              שקט.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
