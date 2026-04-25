import Image from 'next/image'

export interface LogomarkProps {
  size?: number
  priority?: boolean
  applyFilter?: boolean
  className?: string
  /** @deprecated — kept for backward compatibility; has no effect */
  variant?: 'original' | 'espresso' | 'bone'
}

export default function Logomark({
  size = 80,
  priority = false,
  applyFilter = false,
  className = '',
}: LogomarkProps) {
  return (
    <Image
      src="/brand/aw-logo-walnut.png"
      alt="a.w interior design"
      width={655}
      height={627}
      priority={priority}
      className={className}
      style={{
        filter: applyFilter ? 'brightness(0.85) saturate(1.15)' : 'none',
        height: size,
        width: 'auto',
      }}
    />
  )
}
