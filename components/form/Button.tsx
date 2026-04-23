'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  loading?: boolean
  loadingLabel?: string
  children?: React.ReactNode
}

export function Button({
  loading,
  loadingLabel,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      disabled={isDisabled}
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
      className={[
        'bg-clay text-bone py-4 px-12 font-serif text-body-m',
        'transition-[background-color] duration-300 ease-paper',
        'hover:bg-walnut',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand',
        'disabled:bg-stone disabled:text-taupe disabled:cursor-not-allowed',
        'will-change-transform cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading ? loadingLabel : children}
    </motion.button>
  )
}
