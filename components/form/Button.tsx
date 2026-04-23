interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingLabel?: string
}

export function Button({
  loading,
  loadingLabel,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'bg-clay text-bone py-4 px-12 font-serif text-body-m',
        'transition-[background-color,transform] duration-300 ease-paper',
        'hover:bg-walnut',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand',
        'active:translate-y-[1px]',
        'disabled:bg-stone disabled:text-taupe disabled:cursor-not-allowed disabled:translate-y-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading ? loadingLabel : children}
    </button>
  )
}
