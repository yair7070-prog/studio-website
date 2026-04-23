'use client'

import { forwardRef, useState } from 'react'
import type { SelectOption } from '@/lib/content/home'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  id: string
  options: SelectOption[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, onChange, ...rest }, ref) => {
    const [isEmpty, setIsEmpty] = useState(true)

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
      setIsEmpty(e.target.value === '')
      onChange?.(e)
    }

    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-small text-taupe mb-2">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            onChange={handleChange}
            className={`appearance-none bg-transparent border-b border-stone border-b-[1px] py-3 text-body-l w-full outline-none transition-[border-color,border-bottom-width] duration-200 ease-paper focus:border-walnut focus:border-b-[1.5px] pe-8 ${
              isEmpty ? 'text-stone' : 'text-espresso'
            }`}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            {...rest}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Chevron — reading-end (left in RTL) */}
          <span
            className="absolute inset-y-0 end-0 flex items-center pe-1 pointer-events-none text-taupe"
            aria-hidden="true"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <polyline
                points="2,4 6,8 10,4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {error && (
          <p id={`${id}-error`} className="mt-2 text-small text-walnut" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
