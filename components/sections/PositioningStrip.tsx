import type { PositioningStripContent } from '@/lib/content/home'

export function PositioningStrip({ statements }: PositioningStripContent) {
  return (
    <section className="bg-bone py-section-sm">
      <div className="max-w-container mx-auto px-[6vw]">
        <ul className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16 list-none m-0 p-0">
          {statements.map((statement, i) => (
            <li key={i} className="font-serif text-body-l text-espresso text-center">
              {statement}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
