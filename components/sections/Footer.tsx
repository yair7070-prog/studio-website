import Logomark from '@/components/brand/Logomark'
import type { FooterContent } from '@/lib/content/home'

export function Footer({ region, phone, phoneHref, email, instagram, copyright }: FooterContent) {
  return (
    <footer className="bg-bone py-section-sm border-t border-mushroom">
      <div className="max-w-container mx-auto px-[6vw]">
        {/* Top row: Logomark at start (right in RTL), contact at end (left in RTL) */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start gap-2">
            <Logomark variant="original" size={36} />
            <span className="sr-only">a.w interior design — Adi Weinstein</span>
          </div>
          <div className="flex flex-col gap-2 text-end">
            <span className="text-small text-taupe">{region}</span>
            <a
              href={phoneHref}
              className="text-small text-taupe hover:text-walnut transition-colors duration-300 ease-paper"
            >
              <span dir="ltr" className="tabular-nums">{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="text-small text-taupe hover:text-walnut transition-colors duration-300 ease-paper"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Hairline */}
        <div className="mt-12 mb-6 h-px bg-stone" />

        {/* Bottom row */}
        <div className="flex justify-between items-center">
          <span className="text-small text-taupe">{copyright}</span>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-small text-taupe hover:text-walnut transition-colors duration-300 ease-paper"
          >
            @a.w_interiordesign_
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
