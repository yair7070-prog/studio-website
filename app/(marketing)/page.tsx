import { Hero }              from '@/components/sections/Hero'
import { PositioningStrip }  from '@/components/sections/PositioningStrip'
import { About }             from '@/components/sections/About'
import { Services }          from '@/components/sections/Services'
import { SelectedProjects }  from '@/components/sections/SelectedProjects'
import { Process }           from '@/components/sections/Process'
import { Testimonials }      from '@/components/sections/Testimonials'
import { FinalCTA }          from '@/components/sections/FinalCTA'
import { Footer }            from '@/components/sections/Footer'
import {
  hero,
  positioningStrip,
  about,
  serviceCategories,
  projects,
  process,
  testimonials,
  finalCTA,
  footer,
} from '@/lib/content/home'

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero              {...hero} />
      <About             {...about} />
      <PositioningStrip  {...positioningStrip} />
      <Services          categories={serviceCategories} />
      <SelectedProjects  {...projects} />
      <Process           {...process} />
      <Testimonials      {...testimonials} />
      <FinalCTA          {...finalCTA} />
      <Footer            {...footer} />
    </main>
  )
}
