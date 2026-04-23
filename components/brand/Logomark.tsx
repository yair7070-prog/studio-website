import Image from 'next/image'

export interface LogomarkProps {
  variant?: 'original' | 'espresso' | 'bone'
  size?: number
  className?: string
}

const tintFilter: Record<NonNullable<LogomarkProps['variant']>, string> = {
  original: 'none',
  espresso: 'brightness(0) saturate(100%) invert(11%) sepia(17%) saturate(1100%) hue-rotate(350deg) brightness(95%) contrast(88%)',
  bone: 'brightness(0) saturate(100%) invert(94%) sepia(8%) saturate(250%) hue-rotate(10deg) brightness(100%) contrast(92%)',
}

export default function Logomark({
  variant = 'espresso',
  size = 40,
  className = '',
}: LogomarkProps) {
  return (
    <Image
      src="/brand/aw-monogram.png"
      alt="a.w interior design"
      width={size}
      height={size}
      priority
      className={className}
      style={{ filter: tintFilter[variant], height: size, width: 'auto' }}
    />
  )
}
