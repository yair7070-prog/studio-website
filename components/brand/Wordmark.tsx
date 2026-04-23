interface WordmarkProps {
  className?: string
}

export function Wordmark({ className }: WordmarkProps) {
  return (
    <span
      className={`font-serif font-normal text-espresso lowercase tracking-[0.02em] ${className ?? ''}`}
      style={{ fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}
    >
      a.w interior design
    </span>
  )
}
