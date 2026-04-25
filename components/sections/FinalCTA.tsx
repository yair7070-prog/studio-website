'use client'

import { useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MIXED_MEDIA } from '@/lib/assets/mixedMedia'

const EASE = [0.22, 0.61, 0.36, 1] as const
import type { FinalCTAContent } from '@/lib/content/home'
import { submitLead } from '@/lib/leads'
import Logomark from '@/components/brand/Logomark'
import { Field } from '@/components/form/Field'
import { Select } from '@/components/form/Select'
import { Textarea } from '@/components/form/Textarea'
import { Button } from '@/components/form/Button'

function createSchema(errors: FinalCTAContent['form']['errors']) {
  return z.object({
    name: z.string().min(2, errors.required),
    phone: z
      .string()
      .regex(/^0\d{1,2}-?\d{7}$|^\+972\d{8,9}$/, errors.invalidPhone),
    email: z.string().email(errors.invalidEmail),
    region:      z.string().min(1, errors.required),
    projectType: z.string().min(1, errors.required),
    timeline:    z.string().min(1, errors.required),
    size: z.string().optional(),
    message: z.string().optional(),
  })
}

type LeadFormData = z.infer<ReturnType<typeof createSchema>>

export function FinalCTA({
  eyebrow,
  headline,
  intro,
  form,
  success,
}: FinalCTAContent) {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const pensiveRef  = useRef<HTMLDivElement>(null)

  const { scrollYProgress: pensiveProgress } = useScroll({
    target: pensiveRef,
    offset: ['start end', 'end start'],
  })
  const pensiveY = useTransform(pensiveProgress, [0, 1], ['16px', '-16px'])

  const schema = useMemo(() => createSchema(form.errors), [form.errors])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  async function onSubmit(data: LeadFormData) {
    setSubmitError(null)
    try {
      await submitLead(data)
      setSubmitted(true)
    } catch {
      setSubmitError(form.errors.submitFailed)
    }
  }

  return (
    <section ref={sectionRef} id="lead-form" className="bg-sand py-section-xl relative overflow-hidden" aria-labelledby="lead-form-title">

      {/* Pensive portrait — absolute left, parallax 0.95x, desktop only */}
      <motion.div
        ref={pensiveRef}
        className="absolute hidden md:block top-[8%] pointer-events-none z-0"
        style={{ left: '6vw', width: '18%', y: reduced ? '0px' : pensiveY }}
        aria-hidden="true"
      >
        <Image
          src={MIXED_MEDIA.portraits.pensive.src}
          alt=""
          width={MIXED_MEDIA.portraits.pensive.width}
          height={MIXED_MEDIA.portraits.pensive.height}
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(43,36,32,0.12))' }}
        />
      </motion.div>

      {/* Handwritten caption — sits ~24px below portrait bottom edge, desktop only */}
      {/* TODO: replace with proper "אני קוראת כל פנייה" handwritten asset when generated */}
      <div
        className="absolute hidden md:block pointer-events-none z-0"
        style={{ left: '6vw', top: 'calc(8% + 27vw + 24px)', width: 140, opacity: 0.7 }}
        aria-hidden="true"
      >
        <Image
          src={MIXED_MEDIA.marks.bayitSignature.src}
          alt=""
          width={MIXED_MEDIA.marks.bayitSignature.width}
          height={MIXED_MEDIA.marks.bayitSignature.height}
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-container mx-auto px-[6vw] relative z-10">

        <motion.p
          className="text-small text-taupe tracking-[0.08em]"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {eyebrow}
        </motion.p>
        <div className="mt-12" />
        {/* Pencil stroke — decorative mark above headline */}
        <div className="mb-4 pointer-events-none" aria-hidden="true">
          <Image
            src={MIXED_MEDIA.marks.pencilStroke.src}
            alt=""
            width={MIXED_MEDIA.marks.pencilStroke.width}
            height={MIXED_MEDIA.marks.pencilStroke.height}
            style={{ width: 280, height: 'auto', opacity: 0.85 }}
          />
        </div>
        <motion.h2
          id="lead-form-title"
          className="font-serif text-display-xl text-espresso"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
        >
          {headline}
        </motion.h2>
        <div className="mt-8" />
        <motion.p
          className="font-serif text-body-l text-espresso max-w-[56ch]"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
        >
          {intro}
        </motion.p>
        <div className="mt-20" />

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
        >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {/* Brand mark — centered above headline, 32px below */}
              <div className="flex justify-center mb-8">
                <div className="md:hidden">
                  <Logomark size={56} />
                </div>
                <div className="hidden md:block">
                  <Logomark size={64} />
                </div>
              </div>
              <h3 className="font-serif text-display-l text-espresso">
                {success.headline}
              </h3>
              <div className="mt-6" />
              <p className="font-serif text-body-l text-espresso max-w-[48ch]">
                {success.body}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              exit={{ opacity: reduced ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="max-w-[680px] flex flex-col gap-10"
              >
                <Field
                  id="name"
                  label={form.fields.name.label}
                  type="text"
                  autoComplete="name"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Field
                  id="phone"
                  label={form.fields.phone.label}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <Field
                  id="email"
                  label={form.fields.email.label}
                  type="email"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Select
                  id="region"
                  label={form.fields.region.label}
                  options={form.fields.region.options}
                  error={errors.region?.message}
                  {...register('region')}
                />
                <Select
                  id="projectType"
                  label={form.fields.projectType.label}
                  options={form.fields.projectType.options}
                  error={errors.projectType?.message}
                  {...register('projectType')}
                />
                <Select
                  id="timeline"
                  label={form.fields.timeline.label}
                  options={form.fields.timeline.options}
                  error={errors.timeline?.message}
                  {...register('timeline')}
                />
                <Field
                  id="size"
                  label={form.fields.size.label}
                  type="text"
                  inputMode="numeric"
                  error={errors.size?.message}
                  {...register('size')}
                />
                <Textarea
                  id="message"
                  label={form.fields.message.label}
                  error={errors.message?.message}
                  {...register('message')}
                />

                {submitError && (
                  <p className="text-small text-walnut" role="alert">
                    {submitError}
                  </p>
                )}

                <div>
                  {/* 48-hours oval — decorative mark above submit button */}
                  <div className="mb-4 pointer-events-none" aria-hidden="true">
                    <Image
                      src={MIXED_MEDIA.marks.hoursOval.src}
                      alt=""
                      width={MIXED_MEDIA.marks.hoursOval.width}
                      height={MIXED_MEDIA.marks.hoursOval.height}
                      style={{ width: 220, height: 'auto' }}
                    />
                  </div>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    loadingLabel={form.submitting}
                    className="w-full md:w-auto"
                  >
                    {form.submit}
                  </Button>
                </div>
              </form>

              {/* Alternatives */}
              <div className="mt-12">
                <p className="text-small text-taupe">{form.alternativesLabel}</p>
                <div className="mt-4 flex items-center gap-8">
                  <a
                    href={form.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block font-serif text-body-m text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                  >
                    {form.whatsapp.label}
                    <span className="absolute -bottom-px start-0 h-px w-0 bg-espresso group-hover:w-full transition-[width] duration-300 ease-paper motion-reduce:transition-none" />
                  </a>
                  <a
                    href={form.phone.href}
                    className="group relative inline-block font-serif text-body-m text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                  >
                    {form.phone.label}
                    <span className="absolute -bottom-px start-0 h-px w-0 bg-espresso group-hover:w-full transition-[width] duration-300 ease-paper motion-reduce:transition-none" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
