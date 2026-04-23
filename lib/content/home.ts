export interface HeroContent {
  headline: string
  subheadline: string
  cta: string
}

export interface PositioningStripContent {
  items: string[]
}

export interface AboutContent {
  title: string
  body: string
  imageAlt: string
}

export interface ServiceItem {
  title: string
  description: string
}

export interface ServicesContent {
  title: string
  items: ServiceItem[]
}

export interface ProjectItem {
  title: string
  location: string
  imageAlt: string
}

export interface ProjectsContent {
  title: string
  items: ProjectItem[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ProcessContent {
  title: string
  steps: ProcessStep[]
}

export interface TestimonialItem {
  quote: string
  author: string
}

export interface TestimonialsContent {
  title: string
  items: TestimonialItem[]
}

export interface FinalCTAContent {
  headline: string
  cta: string
}

export const hero: HeroContent = {
  headline: '',
  subheadline: '',
  cta: '',
}

export const positioningStrip: PositioningStripContent = {
  items: [],
}

export const about: AboutContent = {
  title: '',
  body: '',
  imageAlt: '',
}

export const services: ServicesContent = {
  title: '',
  items: [],
}

export const projects: ProjectsContent = {
  title: '',
  items: [],
}

export const process: ProcessContent = {
  title: '',
  steps: [],
}

export const testimonials: TestimonialsContent = {
  title: '',
  items: [],
}

export const finalCTA: FinalCTAContent = {
  headline: '',
  cta: '',
}
