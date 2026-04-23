export interface HeroContent {
  positioning: string
  cta: string
  imageAlt: string
  imageLabel?: { text: string; lang: 'he' | 'en' }
}

export interface PositioningStripContent {
  statements: string[]
}

export interface AboutContent {
  paragraph: string
  portraitAlt: string
  signature: string
}

export interface ServiceItem {
  id: string
  title: string
  teaser: string
  included: string
  timeline: string
  start: string
}

export interface ServicesContent {
  eyebrow: string
  items: ServiceItem[]
}

export interface FooterContent {
  studioName: string
  region: string
  phone: string
  email: string
  instagram: string
  copyright: string
}

// ─── Wave 2 ──────────────────────────────────────────────

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

// ─── Wave 3 ──────────────────────────────────────────────

export const about: AboutContent = {
  paragraph:
    'אני מעצבת פנים עם גישה מעשית ורגועה. העבודה שלי מתחילה בהקשבה. לחיי היום־יום של המשפחה, להעדפות שלא תמיד מדוברות, ולפער שלרוב קיים בין שני בני הזוג. משם נבנה בית שמרגיש אישי, נכון, ולא מעוצב לראווה. כל החלטה מוסברת. כל שלב מלווה באופן אישי.',
  portraitAlt: 'דיוקן סביבתי של המעצבת',
  signature: 'Ayelet',
}

export const services: ServicesContent = {
  eyebrow: 'שירותים',
  items: [
    {
      id: 'new-apartment',
      title: 'תכנון דירה חדשה מקבלן',
      teaser: 'ליווי מלא מהתוכניות ועד המפתח',
      included:
        'תכנון חללים, שינויי קבלן, בחירת חומרים, תאורה, מטבח, אמבטיות, ריהוט, טקסטיל וליווי ביצוע.',
      timeline: 'בין שמונה לחמישה־עשר חודשים, בהתאם להיקף ולוחות הקבלן.',
      start: 'שיחת היכרות ללא עלות, סיור בדירה או בתוכניות, והצעה מפורטת.',
    },
    {
      id: 'renovation',
      title: 'שיפוץ דירה קיימת',
      teaser: 'תכנון מחדש של בית קיים',
      included:
        'אבחון המצב הקיים, הצעת תכנון חדש, תיאום בעלי מקצוע, בחירת חומרים וליווי עד סיום.',
      timeline: 'בין ששה לשנים־עשר חודשים, בהתאם להיקף השיפוץ.',
      start: 'פגישה בבית, מיפוי הצרכים, והצעת דרך עבודה מותאמת.',
    },
    {
      id: 'partial',
      title: 'ליווי מעצב חלקי',
      teaser: 'עבור פרויקטים ממוקדים או שלבים נבחרים',
      included:
        'ייעוץ נקודתי לחדר מסוים, תכנון מטבח בלבד, בחירת ריהוט וטקסטיל לבית קיים, או ליווי לשלב ספציפי בתהליך.',
      timeline: 'בין חודש לשלושה חודשים, בהתאם להיקף.',
      start: 'שיחה קצרה להבנת הצורך והגדרת תכולה ברורה.',
    },
    {
      id: 'consultation',
      title: 'ייעוץ ממוקד',
      teaser: 'פגישה אחת, החלטות ברורות',
      included:
        'פגישה בבית או בתוכניות, לרוב עד שעתיים, עם המלצות כתובות לאחר הפגישה.',
      timeline: 'פגישה אחת, מסמך סיכום תוך שבוע.',
      start: 'יצירת קשר עם פרטי הפרויקט.',
    },
  ],
}
