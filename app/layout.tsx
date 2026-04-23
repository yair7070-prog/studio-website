import type { Metadata, Viewport } from 'next'
import { davidLibre, assistant, cormorantGaramond, inter } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'a.w interior design — Adi Weinstein | עיצוב פנים למגורים',
  description:
    'סטודיו בוטיק לעיצוב פנים בניהולה של עדי ויינשטיין. ליווי אישי לדירות קבלן, שיפוצים ובתים פרטיים במרכז הארץ.',
  openGraph: {
    title: 'a.w interior design — Adi Weinstein | עיצוב פנים למגורים',
    description:
      'סטודיו בוטיק לעיצוב פנים בניהולה של עדי ויינשטיין. ליווי אישי לדירות קבלן, שיפוצים ובתים פרטיים במרכז הארץ.',
    locale: 'he_IL',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
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
      <body className="bg-bone text-espresso font-serif">
        {children}
      </body>
    </html>
  )
}
