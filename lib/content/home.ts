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

export interface ServiceTrack {
  id: string
  sizeTier: 'L' | 'M' | 'S'
  title: string
  teaser: string
  description: string
  includedHeading: string
  includedBullets: string[]
}

export interface ServiceCategory {
  id: string
  eyebrow: string
  heading: string
  subheading: string
  tracks: ServiceTrack[]
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

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'design',
    eyebrow: '03 services',
    heading: 'מהתכנון ועד הסטייל',
    subheading: 'מסלולי עיצוב שמלווים אותך משלב הרעיון ועד הבית הגמור',
    tracks: [
      {
        id: 'design-full',
        sizeTier: 'L',
        title: 'הכל כלול',
        teaser: 'המסלול המלא לעיצוב הבית',
        description:
          'מהכנת התוכניות ועד קבלת המפתח. נעבוד יחד על כל הבחירות העיצוביות משלב הקונספט ועד הפרטים הקטנים. ביחד ניצור בית שהוא לא רק יפה אלא גם מרגיש נכון ומתאים בדיוק לאורח החיים שלכם. זהו המסלול שנותן שקט נפשי, מונע טעויות וחוסך: זמן, כסף, אנרגיה והתלבטויות, כדי שתיכנסו לבית שמתוכנן עבורכם מהלב ומעוצב מהיסוד.',
        includedHeading: 'המסלול כולל',
        includedBullets: [
          'בניית קונספט עיצובי מותאם אישית לפי הצרכים, הסגנון החלומות ואורח החיים שלכם.',
          'סט תוכניות עבודה מלא כולל תכנית העמדה, חשמל, תאורה, נגרות בהתאמה אישית, ריצוף, אינסטלציה מטבח ועוד.',
          'בחירת חומרים וליווי לרכישות הדרושות לעיצוב הבית.',
          'פגישות עם ספקים ובעלי מקצוע והתנהלות שוטפת מולם.',
          'פיקוח בשטח ותיאום כדי לוודא שהכל מתבצע לפי התכנון.',
          'הלבשה ובקרה עד הפרט האחרון בעיצוב בית החלומות שלכם.',
        ],
      },
      {
        id: 'design-contractor',
        sizeTier: 'M',
        title: 'למקסם את הסטנדרט',
        teaser: 'ליווי בתהליך שינויי דיירים',
        description:
          'הסטנדרט של הקבלן הוא רק נקודת הפתיחה, אני כאן כדי לקחת אותו כמה רמות קדימה. במסלול הזה נלווה יחד את תהליך שינויי הדיירים. נשדרג את התכנון הקבלני כך שיתאים באמת לאורח החיים שלכם, ונדאג לכל הפרטים, מהתכנון ועד ההתנהלות מול הקבלן כדי שתיכנסו לבית שהוא באמת שלכם בלי כאב ראש ועם הרבה שקט.',
        includedHeading: 'המסלול כולל',
        includedBullets: [
          'בניית קונספט עיצובי מותאם אישית לפי הצרכים, הסגנון החלומות ואורח החיים שלכם.',
          'סט תוכניות עבודה מלא לשינויי דיירים כולל תכנית העמדה, חשמל ותאורה, ריצוף, אינסטלציה, תקרה מטבח ועוד.',
          'ליווי שוטף ומענה מול הקבלן עד אישור התכניות לביצוע.',
          'בקרה על תכניות שינויי הדיירים שאכן הכל קיים לפי התכנון המאושר.',
          'ליווי אישי בבחירת הריצוף, סניטריה, ופגישה עם ספק המטבחים.',
        ],
      },
      {
        id: 'design-kitchen',
        sizeTier: 'S',
        title: 'לעצב בטעם',
        teaser: 'עיצוב ותכנון מטבח בהתאמה אישית',
        description:
          'מטבח מעוצב בטעם טוב הוא כזה שלא רק נראה מדהים- אלא עובד נכון. במסלול הזה נבנה יחד מטבח שמדויק לסגנון החיים שלך: נוח, פרקטי, מעוצב ועמיד לאורך זמן. עם ליווי מקצועי בתכנון הפנימי, בחירת חומרים, פרזול ותאורה. תוכלו להיות בטוחים שהתוצאה תהיה יפה, פרקטית ומדויקת לאורך החיים שלכם.',
        includedHeading: 'המסלול כולל',
        includedBullets: [
          'תכנון המטבח לפי החלומות, הסגנון העיצובי ואורח החיים שלכם.',
          'הכנת תוכניות מדויקות וליווי אישי מול ספק המטבח בכדי לוודא שהכל מתוכנן לפי הדרישות.',
          'ליווי בבחירת חומרי הגמר לחזיתות, שיש, תאורה, חשמלים, ריהוט משלים וכל הדרוש למטבח המושלם.',
          'פיקוח בשלב המדידות, ביקור בשטח, הלבשה וליווי סופי עם טאצ\' עיצובי.',
        ],
      },
    ],
  },
  {
    id: 'styling',
    eyebrow: '04 styling',
    heading: 'בלי להזיז קיר',
    subheading: 'שירותי הום סטיילינג שמביאים שינוי מורגש בלי אבק, שבירת קירות ועם המון סטייל',
    tracks: [
      {
        id: 'styling-full',
        sizeTier: 'L',
        title: 'הום סטיילינג כולל',
        teaser: 'המסלול המלא להום סטיילינג',
        description:
          'עברתם לבית/דירה חדשה או רוצים לרענן את הבית שבו אתם מתגוררים בלי להיכנס לבלאגן של שיפוץ ושבירת קירות ואבק? שירות ההום סטיילינג מתאים בדיוק לכם. בשינוי מדויק של ריהוט, צבעים, תאורה ואקססוריז, ניצור יחד בית שמשדרג את האווירה ומשפר את איכות החיים שלכם. זהו פתרון חכם, אישי וקליל שמאפשר לכם ליהנות מבית מחודש, נעים ומזמין בלי כאב ראש ובלי בזבוז זמן.',
        includedHeading: 'השירות כולל',
        includedBullets: [
          'תכנון העמדת הרהיטים וגיבוש קונספט עיצובי לכלל הבית.',
          'ליווי אישי מלא בבחירות הרהיטים, תאורה, אקססוריז וכל מה שנחוץ לעיצוב ביתכם.',
          'בחירת צבעי גמר תוך שמירה על קו עיצובי אחיד.',
          'ליווי אישי בקניית הפריטים הנחוצים לעיצוב הבית והעמדה סופית בביתכם.',
        ],
      },
      {
        id: 'styling-focused',
        sizeTier: 'M',
        title: 'הום סטיילינג ממוקד',
        teaser: 'שינוי גדול בחדר אחד בבית',
        description:
          'לפעמים כל מה שצריך זה לגעת במקום אחד בבית: להפוך סלון לעוטף ומזמין, להכין חדר לתינוק חדש, חדר שינה לחדר במלון, חדר ילדים שהוא חלום, או לעצב משרד ביתי שכיף להיות בו. בעיצוב מדויק, בחירות נכונות והקשבה אמיתית לצרכים שלכם, נעשה שינוי שמרגיש גדול ומשמעותי בלי לשבור קירות, ועם הרבה תשומת לב לפרטים הקטנים שעושים את ההבדל.',
        includedHeading: 'התהליך כולל',
        includedBullets: [
          'תכנון העמדת הרהיטים, גיבוש קונספט עיצובי לחדר הנבחר.',
          'ליווי אישי מלא בבחירות הרהיטים, תאורה, אקססוריז וכל מה שנחוץ לעיצוב החדר.',
          'בחירת צבעי גמר תוך שמירה על קו עיצובי אחיד.',
          'ליווי אישי בקניית הפריטים הנחוצים לעיצוב והעמדה סופית בביתכם.',
        ],
      },
      {
        id: 'styling-consultation',
        sizeTier: 'S',
        title: 'פגישה מקצועית',
        teaser: 'פגישת ייעוץ ממוקדת',
        description:
          'פגישת ייעוץ חד-פעמית תעזור לך לעשות סדר בכל מה שמרגיש מבולגן בבית. נבחן יחד את כל ההתלבטויות, נחדד את הסגנון שלך ונבנה כיוון ברור ומדויק עם הכוונה מקצועית שמביאה לתוצאה הטובה ביותר עבורכם.',
        includedHeading: 'מהפגישה תצאו',
        includedBullets: [
          'תכנית העמדת ריהוט פרקטית.',
          'המלצות לריהוט ואקססוריז.',
          'רשימת ספקים מומלצים.',
          'לוח צבעים וחומרים מפורט ובהתאמה אישית.',
          'רעיונות מדויקים, הכוונה מקצועית והרבה ביטחון להמשך עיצוב הבית.',
        ],
      },
    ],
  },
]

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
  label?: ProjectLabel
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
      label: { text: 'בתכנון', variant: 'in-progress' },
      coverAlt: 'הדמיה של סלון בדירה בתל אביב',
      description:
        'דירת קבלן בת ארבעה חדרים בפרויקט חדש. עבודה על שינויי קבלן מוקדמים, תכנון המטבח והחללים הציבוריים, ובחירת חומרים וטקסטיל.',
    },
    {
      id: 'house-hasharon',
      name: 'בית פרטי בשרון',
      metadata: 'שרון, בתכנון',
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
