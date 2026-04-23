import { forwardRef } from 'react'

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  id: string
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-small text-taupe mb-2">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className="bg-transparent border-b border-stone border-b-[1px] py-3 text-body-l text-espresso w-full outline-none transition-[border-color,border-bottom-width] duration-200 ease-paper focus:border-walnut focus:border-b-[1.5px]"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={`${id}-error`} className="mt-2 text-small text-walnut" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Field.displayName = 'Field'
