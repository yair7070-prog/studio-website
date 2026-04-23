export interface HeroContent {
  positioning: string
  cta: string
  imageAlt: string
  imageLabel?: string
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
  imageLabel: 'הדמיה',
}

export const positioningStrip: PositioningStripContent = {
  statements: [
    'כל פרויקט מתחיל בהקשבה מעמיקה לאנשים שיחיו בו.',
    'עיצוב שלא מתיימר — רק חלל שמרגיש נכון.',
    'פרטים שנבחרים בקפידה, תוצאה שנראית מובנת מאליה.',
  ],
}

export const footer: FooterContent = {
  studioName: 'a.w interior design',
  region: 'תל אביב, ישראל',
  phone: '+972-50-000-0000',
  email: 'studio@aw-interiordesign.co.il',
  instagram: '@aw.interiordesign',
  copyright: '© 2024 a.w interior design',
}
