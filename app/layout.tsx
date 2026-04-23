import type { Metadata, Viewport } from 'next'
import { davidLibre, assistant, cormorantGaramond, inter } from '@/lib/fonts'
import { IntroLoader } from '@/components/brand/IntroLoader'
import { Cursor }      from '@/components/ui/Cursor'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://awinteriors.co.il'),
  title: 'a.w interior design — Adi Weinstein | עיצוב פנים למגורים',
  description:
    'סטודיו בוטיק לעיצוב פנים בניהולה של עדי ויינשטיין. ליווי אישי לדירות קבלן, שיפוצים ובתים פרטיים במרכז הארץ.',
  openGraph: {
    title: 'a.w interior design — Adi Weinstein',
    description: 'עיצוב פנים למגורים. ליווי אישי, מתכנון ועד מפתח.',
    locale: 'he_IL',
    type: 'website',
    url: 'https://awinteriors.co.il',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'a.w interior design' }],
  },
  alternates: { canonical: 'https://awinteriors.co.il' },
  robots: { index: true, follow: true },
  icons: {
    icon: '/brand/aw-monogram.png',
    apple: '/brand/aw-monogram.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesignBusiness',
  name: 'a.w interior design',
  alternateName: 'עדי ויינשטיין עיצוב פנים',
  founder: { '@type': 'Person', name: 'Adi Weinstein' },
  areaServed: [
    { '@type': 'Place', name: 'Central Israel' },
    { '@type': 'Place', name: 'מרכז הארץ' },
  ],
  telephone: '+972542616415',
  email: 'awds.adiw@gmail.com',
  url: 'https://awinteriors.co.il',
  sameAs: ['https://www.instagram.com/a.w_interiordesign_/'],
  inLanguage: 'he-IL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${davidLibre.variable} ${assistant.variable} ${cormorantGaramond.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bone text-espresso font-serif">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-[99999] focus-visible:top-4 focus-visible:start-4 focus-visible:bg-bone focus-visible:text-espresso focus-visible:font-serif focus-visible:text-body-m focus-visible:px-4 focus-visible:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut focus-visible:ring-offset-2"
        >
          דלג לתוכן
        </a>
        <IntroLoader />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
