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
  tagline: string
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
  phoneHref: string
  email: string
  instagram: string
  copyright: string
}

// ─── Wave 2 ──────────────────────────────────────────────

export const hero: HeroContent = {
  positioning: 'בית שנבנה סביבך.',
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
  phone: '054-261-6415',
  phoneHref: 'tel:+972542616415',
  email: 'awds.adiw@gmail.com',
  instagram: 'https://www.instagram.com/a.w_designstudio',
  copyright: '© 2026 a.w interior design',
}

// ─── Wave 3 ──────────────────────────────────────────────

export const about: AboutContent = {
  paragraph:
    'העיצוב עבורי הוא כלי ליצירת סביבה נעימה, הרמונית ופונקציונלית שנשארת רלוונטית לאורך זמן. שמי עדי וינשטין, הנדסאית אדריכלות ומעצבת פנים בוגרת הפקולטה לאדריכלות ועיצוב פנים בשנקר. מתמחה בעיצוב מודרני-מינימליסטי, ויוצרת סביבת מגורים מעודנת ופונקציונאלית שמעשירה את חווית היום יום. אני מלווה לקוחות בתהליך מקצועי שמעניק שקט נפשי וביטחון בכל שלב — מהתכנון ועד הפרטים הקטנים. בשביל זה אני כאן.',
  portraitAlt: 'דיוקן סביבתי של המעצבת',
  signature: 'Adi Weinstein',
  tagline: 'מוציאה את המקסימום מכל סטנדרט.',
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

// ─── Wave 5 ──────────────────────────────────────────────

export interface SelectOption {
  value: string
  label: string
}

export interface FieldConfig {
  label: string
  optional?: boolean
}

export interface SelectFieldConfig extends FieldConfig {
  options: SelectOption[]
}

export interface LeadFormContent {
  fields: {
    name: FieldConfig
    phone: FieldConfig
    email: FieldConfig
    region: SelectFieldConfig
    projectType: SelectFieldConfig
    timeline: SelectFieldConfig
    size: FieldConfig
    message: FieldConfig
  }
  submit: string
  submitting: string
  alternativesLabel: string
  whatsapp: { label: string; href: string }
  phone: { label: string; href: string }
  errors: {
    required: string
    invalidPhone: string
    invalidEmail: string
    submitFailed: string
  }
}

export interface FinalCTAContent {
  eyebrow: string
  headline: string
  intro: string
  form: LeadFormContent
  success: {
    headline: string
    body: string
  }
}

export const finalCTA: FinalCTAContent = {
  eyebrow: 'התחלת שיחה',
  headline: 'הפרויקט שלכם.',
  intro: 'ספרו לי על הבית, על השלב שאתם נמצאים בו, ועל מה שחשוב לכם. אני חוזרת אישית לכל פנייה תוך 48 שעות.',
  form: {
    fields: {
      name:        { label: 'שם מלא' },
      phone:       { label: 'טלפון' },
      email:       { label: 'אימייל' },
      region: {
        label: 'אזור הפרויקט',
        options: [
          { value: '',        label: 'בחרו אזור' },
          { value: 'merkaz',  label: 'מרכז' },
          { value: 'sharon',  label: 'שרון' },
          { value: 'shfela',  label: 'שפלה' },
          { value: 'other',   label: 'אחר' },
        ],
      },
      projectType: {
        label: 'סוג הפרויקט',
        options: [
          { value: '',               label: 'בחרו סוג' },
          { value: 'contractor',     label: 'דירה מקבלן' },
          { value: 'renovation',     label: 'שיפוץ דירה קיימת' },
          { value: 'private-house',  label: 'בית פרטי' },
          { value: 'undecided',      label: 'טרם החלטתי' },
        ],
      },
      timeline: {
        label: 'לוח זמנים מתוכנן',
        options: [
          { value: '',          label: 'בחרו לוח זמנים' },
          { value: 'immediate', label: 'מיידי' },
          { value: 'quarter',   label: 'ברבעון הקרוב' },
          { value: 'half-year', label: 'חצי שנה' },
          { value: 'exploring', label: 'עדיין בוחנת אפשרויות' },
        ],
      },
      size:    { label: 'מטר״ר משוער', optional: true },
      message: { label: 'ספרו לי על הפרויקט', optional: true },
    },
    submit:           'שליחה',
    submitting:       'שולח...',
    alternativesLabel: 'או בדרך אחרת',
    whatsapp: { label: 'וואטסאפ', href: 'https://bit.ly/44t0UwS' },
    phone:    { label: 'טלפון',    href: 'tel:+972542616415' },
    errors: {
      required:     'שדה חובה',
      invalidPhone: 'אנא הזיני מספר טלפון תקין',
      invalidEmail: 'אנא הזיני כתובת אימייל תקינה',
      submitFailed: 'משהו השתבש. אנא נסי שוב או פני אליי ישירות.',
    },
  },
  success: {
    headline: 'תודה.',
    body: 'קיבלתי את הפנייה. אני חוזרת אלייך אישית תוך 48 שעות, ברוב המקרים הרבה קודם.',
  },
}

// ─── Wave 4 ──────────────────────────────────────────────

export interface ProjectLabel {
  text: string
  variant: 'rendering' | 'in-progress' | 'nearing-completion' | 'completed'
}

export interface ProjectItem {
  id: string
  name: string
  metadata: string
  label: ProjectLabel
  coverAlt: string
  description: string
}

export interface ProjectsContent {
  eyebrow: string
  items: ProjectItem[]
}

export interface ProcessStage {
  number: string
  title: string
  description: string
}

export interface ProcessContent {
  eyebrow: string
  stages: ProcessStage[]
}

export interface TestimonialItem {
  id: string
  text: string
  name: string
  location: string
  year: string
}

export interface TestimonialsContent {
  eyebrow: string
  items: TestimonialItem[]
}

export const projects: ProjectsContent = {
  eyebrow: 'פרויקטים נבחרים',
  items: [
    {
      id: 'apartment-tel-aviv',
      name: 'דירה בצפון תל אביב',
      metadata: 'תל אביב, 2025',
      label: { text: 'הדמיה', variant: 'rendering' },
      coverAlt: 'הדמיה של סלון בדירה בתל אביב',
      description:
        'דירת קבלן בת ארבעה חדרים בפרויקט חדש. עבודה על שינויי קבלן מוקדמים, תכנון המטבח והחללים הציבוריים, ובחירת חומרים וטקסטיל.',
    },
    {
      id: 'house-hasharon',
      name: 'בית פרטי בשרון',
      metadata: 'כפר שמריהו, בתכנון',
      label: { text: 'בתכנון', variant: 'in-progress' },
      coverAlt: 'הדמיה של כניסה לבית פרטי',
      description:
        'בית משפחתי בן שתי קומות. ליווי מלא מתכנון ראשוני ועד ביצוע, עם דגש על שילוב בין חללים פתוחים ופרטיות.',
    },
    {
      id: 'apartment-herzliya',
      name: 'דירה בהרצליה פיתוח',
      metadata: 'הרצליה, לקראת סיום',
      label: { text: 'לקראת סיום', variant: 'nearing-completion' },
      coverAlt: 'מבט על סלון בהרצליה',
      description:
        'שיפוץ מקיף של דירת גן קיימת. פתיחת חללים, החלפת רצפות, תכנון מטבח מחדש ועיצוב מלא של הריהוט והטקסטיל.',
    },
    {
      id: 'apartment-raanana',
      name: 'דירה ברעננה',
      metadata: 'רעננה, הושלם 2024',
      label: { text: 'פרויקט שהושלם', variant: 'completed' },
      coverAlt: 'סלון דירה מעוצבת ברעננה',
      description:
        'דירת חמישה חדרים. עבודה מול זוג צעיר עם ילדים, דגש על פרקטיות, טקסטורות חמות, וחללים גמישים לשינוי לאורך השנים.',
    },
  ],
}

export const process: ProcessContent = {
  eyebrow: 'תהליך העבודה',
  stages: [
    {
      number: '01',
      title: 'היכרות',
      description:
        'שיחה ראשונית ופגישה בבית או בתוכניות. אני מקשיבה לצרכים, להעדפות של שני בני הזוג, ולחיים שאתם רוצים לנהל בבית. יוצאים עם הבנה משותפת של הפרויקט.',
    },
    {
      number: '02',
      title: 'קונספט ותכנון',
      description:
        'הצגת שפה עיצובית, תכנון חללים, פריסות ריהוט, ובחירת חומרים ראשונית. כל החלטה מוסברת ומוצגת בהקשר של הבית כולו, לא כבחירה מבודדת.',
    },
    {
      number: '03',
      title: 'תכנון מפורט וביצוע',
      description:
        'תוכניות עבודה מפורטות, מפרטים, בחירות סופיות של חומרים, ריהוט וטקסטיל. תיאום מלא מול הקבלן ובעלי המקצוע, עם ביקורים קבועים באתר.',
    },
    {
      number: '04',
      title: 'ליווי עד המפתח',
      description:
        'אני נשארת לצדכם עד יום הכניסה. סידור סופי, התאמות אחרונות, וליווי אישי לכל שאלה שעולה בשלב הזה. הבית מסונכרן ומוכן לחיים שלכם.',
    },
  ],
}

export const testimonials: TestimonialsContent = {
  eyebrow: 'עדויות',
  items: [
    {
      id: 't1',
      text: 'עדי הצליחה לגשר בינינו בלי לוותר לאחד מאיתנו. היא הקשיבה באמת, וההחלטות הסופיות הרגישו כאילו אנחנו קיבלנו אותן יחד איתה, לא כפו עלינו.',
      name: 'ש׳ ונ׳',
      location: 'הרצליה',
      year: '2024',
    },
    {
      id: 't2',
      text: 'לא היה רגע אחד בתהליך שבו לא ידענו מה קורה ולמה. היא מסבירה כל בחירה, וזה מה שעשה את כל ההבדל.',
      name: 'ד׳',
      location: 'רעננה',
      year: '2024',
    },
    {
      id: 't3',
      text: 'הבית שלנו הרגיש כמו שלנו מהרגע שנכנסנו. לא מוזה עיצובית, לא משהו שצולם למגזין. שלנו ממש.',
      name: 'ע׳ ור׳',
      location: 'תל אביב',
      year: '2023',
    },
  ],
}
