'use client'

// Custom listbox — @headlessui/react not in deps; ARIA wired manually per WAI-ARIA
// Listbox pattern (combobox + listbox roles with aria-activedescendant).
// Mobile keeps the native <select>; desktop shows the custom panel.

import { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { SelectOption } from '@/lib/content/home'

const EASE = [0.22, 0.61, 0.36, 1] as const

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onBlur'> {
  label: string
  error?: string
  id: string
  options: SelectOption[]
  /** Widened to Element so it can be forwarded to both <select> and <button> */
  onBlur?: (e: React.FocusEvent<Element>) => void
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, onChange, onBlur, name, ...rest }, forwardedRef) => {
    const reduced = useReducedMotion()
    const [isOpen, setIsOpen]           = useState(false)
    const [selectedValue, setSelected]  = useState('')
    const [activeIndex, setActive]      = useState(-1)

    const hiddenRef  = useRef<HTMLSelectElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const listRef    = useRef<HTMLUListElement>(null)
    const listboxId  = useId()
    const labelId    = `${id}-label`

    /* Merge forwarded ref (react-hook-form) with internal ref */
    const mergeRef = useCallback((el: HTMLSelectElement | null) => {
      hiddenRef.current = el
      if (typeof forwardedRef === 'function') forwardedRef(el)
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLSelectElement | null>).current = el
    }, [forwardedRef])

    /* Derived */
    const realOptions  = options.filter(o => o.value !== '')
    const placeholder  = options.find(o => o.value === '') ?? options[0]
    const selectedOpt  = realOptions.find(o => o.value === selectedValue)
    const isEmpty      = !selectedValue

    /* Commit a selection: sync hidden native select → react-hook-form picks up the native change event */
    const commit = useCallback((value: string) => {
      setSelected(value)
      setIsOpen(false)
      setActive(-1)
      triggerRef.current?.focus()

      if (hiddenRef.current) {
        hiddenRef.current.value = value
        hiddenRef.current.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }, [])

    /* Close on outside pointer-down */
    useEffect(() => {
      if (!isOpen) return
      const close = (e: PointerEvent) => {
        if (
          !triggerRef.current?.contains(e.target as Node) &&
          !listRef.current?.contains(e.target as Node)
        ) {
          setIsOpen(false)
          setActive(-1)
        }
      }
      document.addEventListener('pointerdown', close)
      return () => document.removeEventListener('pointerdown', close)
    }, [isOpen])

    /* Focus list when opened; scroll active option into view */
    useEffect(() => {
      if (isOpen) listRef.current?.focus()
    }, [isOpen])

    useEffect(() => {
      if (!isOpen || activeIndex < 0 || !listRef.current) return
      const el = listRef.current.children[activeIndex] as HTMLElement
      el?.scrollIntoView({ block: 'nearest' })
    }, [activeIndex, isOpen])

    const openAt = useCallback((idx: number) => {
      setIsOpen(true)
      setActive(idx)
    }, [])

    /* Trigger keyboard */
    const onTriggerKey = useCallback((e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter': case ' ':
          e.preventDefault()
          openAt(realOptions.findIndex(o => o.value === selectedValue) || 0)
          break
        case 'ArrowDown':
          e.preventDefault()
          openAt(Math.max(0, realOptions.findIndex(o => o.value === selectedValue)))
          break
        case 'ArrowUp':
          e.preventDefault()
          openAt(realOptions.length - 1)
          break
      }
    }, [openAt, realOptions, selectedValue])

    /* List keyboard */
    const onListKey = useCallback((e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActive(i => Math.min(i + 1, realOptions.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setActive(i => Math.max(i - 1, 0))
          break
        case 'Home':  e.preventDefault(); setActive(0); break
        case 'End':   e.preventDefault(); setActive(realOptions.length - 1); break
        case 'Enter': case ' ':
          e.preventDefault()
          if (activeIndex >= 0) commit(realOptions[activeIndex].value)
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setActive(-1)
          triggerRef.current?.focus()
          break
        case 'Tab':
          setIsOpen(false)
          setActive(-1)
          break
      }
    }, [realOptions, activeIndex, commit])

    return (
      <div className="flex flex-col">
        {/* Label — explicit id so desktop button can reference it via aria-labelledby */}
        <span id={labelId} className="text-small text-taupe mb-2 select-none cursor-default">
          {label}
        </span>

        {/*
          Hidden native select — uncontrolled, always in DOM, invisible to AT (aria-hidden).
          react-hook-form holds a ref here; value is updated via direct DOM write +
          native change event dispatch in commit().
        */}
        <select
          ref={mergeRef}
          name={name}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
          defaultValue=""
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* ── Mobile: styled native select ─────────────────────────── */}
        <div className="md:hidden relative">
          <select
            id={id}
            aria-labelledby={labelId}
            onChange={e => { commit(e.target.value); onChange?.(e) }}
            onBlur={onBlur}
            value={selectedValue}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={[
              'appearance-none bg-transparent w-full outline-none pe-8',
              'border-b border-stone border-b-[1px] py-3 text-body-l',
              'transition-[border-color,border-bottom-width] duration-200 ease-paper',
              'focus:border-walnut focus:border-b-[1.5px]',
              isEmpty ? 'text-stone' : 'text-espresso',
            ].join(' ')}
            {...rest}
          >
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <span className="absolute inset-y-0 end-0 flex items-center pe-1 pointer-events-none text-taupe" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <polyline points="2,4 6,8 10,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* ── Desktop: custom listbox ───────────────────────────────── */}
        <div className="hidden md:block relative">
          {/* Trigger button */}
          <button
            ref={triggerRef}
            type="button"
            id={`${id}-trigger`}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? listboxId : undefined}
            aria-activedescendant={
              isOpen && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined
            }
            aria-labelledby={`${labelId} ${id}-trigger`}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            onClick={() => isOpen ? (setIsOpen(false), setActive(-1)) : openAt(Math.max(0, realOptions.findIndex(o => o.value === selectedValue)))}
            onKeyDown={onTriggerKey}
            onBlur={onBlur}
            className={[
              'flex w-full items-center justify-between text-start',
              'border-b border-stone border-b-[1px] py-3 pe-8',
              'text-body-l outline-none cursor-pointer',
              'transition-[border-color,border-bottom-width] duration-200 ease-paper',
              'focus:border-walnut focus:border-b-[1.5px]',
              'focus-visible:outline-none',
              isEmpty ? 'text-stone' : 'text-espresso',
            ].join(' ')}
          >
            <span>{selectedOpt?.label ?? placeholder?.label ?? ''}</span>
          </button>

          {/* Animated chevron — reading-end side */}
          <span
            className="absolute inset-y-0 end-0 flex items-center pe-1 pointer-events-none text-taupe"
            aria-hidden="true"
          >
            <motion.svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
            >
              <polyline
                points="2,4 6,8 10,4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </span>

          {/* Dropdown panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                ref={listRef}
                id={listboxId}
                role="listbox"
                aria-label={label}
                tabIndex={-1}
                initial={{ opacity: 0, y: reduced ? 0 : -8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduced ? 0 : 0.25, ease: EASE },
                }}
                exit={{
                  opacity: 0,
                  y: reduced ? 0 : -6,
                  transition: { duration: reduced ? 0 : 0.2, ease: EASE },
                }}
                onKeyDown={onListKey}
                className="absolute top-full start-0 end-0 z-20 mt-1 overflow-y-auto bg-bone border border-stone focus:outline-none"
                style={{
                  maxHeight: '240px',
                  borderRadius: '1px',
                  boxShadow: '0 4px 16px -4px rgba(43, 36, 32, 0.08)',
                }}
              >
                {realOptions.map((opt, i) => {
                  const isSel    = opt.value === selectedValue
                  const isActive = i === activeIndex
                  return (
                    <li
                      key={opt.value}
                      id={`${listboxId}-opt-${i}`}
                      role="option"
                      aria-selected={isSel}
                      onClick={() => commit(opt.value)}
                      onPointerEnter={() => setActive(i)}
                      className={[
                        'flex items-center justify-between px-4 py-3',
                        'font-serif text-body-m text-espresso cursor-pointer select-none',
                        'transition-colors duration-150 ease-paper',
                        isActive ? 'bg-sand' : isSel ? 'bg-mushroom/30' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      <span>{opt.label}</span>
                      {isSel && (
                        <svg
                          width="11" height="9" viewBox="0 0 11 9"
                          fill="none" className="flex-shrink-0 ms-3"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 4.5L4 7.5L10 1"
                            stroke="#8B6B4A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </li>
                  )
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <p id={`${id}-error`} role="alert" className="mt-2 text-small text-walnut">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
