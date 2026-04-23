import { Hero }               from '@/components/sections/Hero'
import { PositioningStrip }   from '@/components/sections/PositioningStrip'
import { About }              from '@/components/sections/About'
import { ServicesAccordion }  from '@/components/sections/ServicesAccordion'
import { SelectedProjects }   from '@/components/sections/SelectedProjects'
import { Process }            from '@/components/sections/Process'
import { Testimonials }       from '@/components/sections/Testimonials'
import { Footer }             from '@/components/sections/Footer'
import {
  hero,
  positioningStrip,
  about,
  services,
  projects,
  process,
  testimonials,
  footer,
} from '@/lib/content/home'

export default function HomePage() {
  return (
    <main>
      <Hero               {...hero} />
      <PositioningStrip   {...positioningStrip} />
      <About              {...about} />
      <ServicesAccordion  eyebrow={services.eyebrow} items={services.items} />
      <SelectedProjects   {...projects} />
      <Process            {...process} />
      <Testimonials       {...testimonials} />
      <Footer             {...footer} />
    </main>
  )
}
