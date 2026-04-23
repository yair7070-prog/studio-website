import { Hero } from '@/components/sections/Hero'
import { PositioningStrip } from '@/components/sections/PositioningStrip'
import { Footer } from '@/components/sections/Footer'
import { hero, positioningStrip, footer } from '@/lib/content/home'

export default function HomePage() {
  return (
    <main>
      <Hero {...hero} />
      <PositioningStrip {...positioningStrip} />
      <Footer {...footer} />
    </main>
  )
}
