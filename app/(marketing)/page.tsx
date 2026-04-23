import { Hero } from '@/components/sections/Hero'
import { PositioningStrip } from '@/components/sections/PositioningStrip'
import { About } from '@/components/sections/About'
import { ServicesAccordion } from '@/components/sections/ServicesAccordion'
import { Footer } from '@/components/sections/Footer'
import { hero, positioningStrip, about, services, footer } from '@/lib/content/home'

export default function HomePage() {
  return (
    <main>
      <Hero {...hero} />
      <PositioningStrip {...positioningStrip} />
      <About {...about} />
      <ServicesAccordion {...services} />
      <Footer {...footer} />
    </main>
  )
}
