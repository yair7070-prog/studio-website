export interface HeroContent {
  positioning: string
  cta: string
  imageAlt: string
  imageLabel?: { text: string; lang: 'he' | 'en' }
}

export interface PositioningStripContent {
  statements: string[]
}

export interface FooterContent {
  studioName: string
  region: string
  phone: string
  email: string
  instagram: string
  copyright: string
}

export const hero: HeroContent = {
  positioning: 'תכנון פנים לבית שנבנה סביב האנשים שגרים בו.',
  cta: 'לקביעת שיחת היכרות',
  imageAlt: 'חלל מגורים בתכנון האולפן',
  imageLabel: { text: 'הדמיה', lang: 'he' },
}

export const positioningStrip: PositioningStripContent = {
  statements: [
    'ליווי אישי מהשרטוט הראשון ועד המפתח',
    'החלטות מנומקות, לא טרנדים חולפים',
    'גישור בין שני בני הזוג',
  ],
}

export const footer: FooterContent = {
  studioName: 'a.w interior design',
  region: 'מרכז הארץ — מגדרה ועד חדרה',
  phone: '+972-50-000-0000',
  email: 'studio@aw-interiordesign.co.il',
  instagram: '@aw.interiordesign',
  copyright: '© 2026 a.w interior design',
}
