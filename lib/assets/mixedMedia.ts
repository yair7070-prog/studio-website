export const MIXED_MEDIA = {
  portraits: {
    primary:       { src: '/assets/portraits/adi-portrait-primary.png',       width: 1122, height: 1402, alt: 'אדי וינשטיין — מעצבת הפנים' },
    environmental: { src: '/assets/portraits/adi-portrait-environmental.png', width: 1672, height: 941,  alt: 'אדי וינשטיין בסטודיו' },
    pensive:       { src: '/assets/portraits/adi-portrait-pensive.png',       width: 1024, height: 1536, alt: 'אדי וינשטיין' },
    standing:      { src: '/assets/portraits/adi-portrait-standing.png',      width: 1122, height: 1402, alt: 'אדי וינשטיין' },
  },
  marks: {
    travertineSlab:   { src: '/assets/marks/travertine-slab.png',      width: 1161, height: 1355 },
    bowlPolaroid:     { src: '/assets/marks/bowl-polaroid.png',         width: 1162, height: 1354 },
    bayitSignature:   { src: '/assets/marks/bayit-signature.png',       width: 1774, height: 887  },
    aniqoretCaption:  { src: '/assets/marks/aniqoret-caption.png',      width: 1672, height: 941  },
    sectionSketch:    { src: '/assets/marks/section-sketch-2-70.png',   width: 1086, height: 1448 },
    circleArrow:      { src: '/assets/marks/circle-arrow.png',          width: 2508, height: 627  },
    hoursOval:        { src: '/assets/marks/48-hours-oval.png',         width: 1448, height: 1086 },
    pencilStroke:     { src: '/assets/marks/pencil-stroke.png',         width: 2172, height: 724  },
    floorplanCurved:  { src: '/assets/marks/floorplan-curved-3-20.png', width: 1448, height: 1086 },
  },
  process: {
    floorplanSketching: { src: '/assets/process/floorplan-sketching.png', width: 1122, height: 1402, alt: 'שרטוט תוכנית רצפה' },
    planAnnotating:     { src: '/assets/process/plan-annotating.png',     width: 1122, height: 1402, alt: 'הערות על תוכנית עיצוב' },
    sketchbookClosing:  { src: '/assets/process/sketchbook-closing.png',  width: 1122, height: 1402, alt: 'ספר סקיצות' },
    swatchesArranging:  { src: '/assets/process/swatches-arranging.png',  width: 1122, height: 1402, alt: 'דוגמאות בד וחומרים' },
  },
  projects: {
    'apartment-tel-aviv': {
      hero: { src: '/assets/projects/proj-01-tlv-hero.png', width: 1122, height: 1402, alt: 'הדמיה של דירה בצפון תל אביב' },
      overlays: {
        annotation:    { src: '/assets/projects/overlay-p1-annotation.png',     width: 1672, height: 941,  alt: 'הערה בכתב יד' },
        floorplanCard: { src: '/assets/projects/overlay-p1-floorplan-card.png', width: 1254, height: 1254, alt: 'תכנית הדירה' },
        swatches:      { src: '/assets/projects/overlay-p1-swatches.png',       width: 1916, height: 821,  alt: 'דוגמיות חומרים' },
      },
    },
    'house-hasharon': {
      hero: { src: '/assets/projects/proj-02-sharon-hero.png', width: 1122, height: 1402, alt: 'הדמיה של בית פרטי בשרון' },
      overlays: {
        annotation: { src: '/assets/projects/overlay-p2-annotation.png', width: 1916, height: 821, alt: 'הערה בכתב יד' },
        elevation:  { src: '/assets/projects/overlay-p2-elevation.png',  width: 1774, height: 887, alt: 'חזית אדריכלית' },
        swatches:   { src: '/assets/projects/overlay-p2-swatches.png',   width: 1915, height: 821, alt: 'דוגמיות חומרים' },
      },
    },
    'apartment-herzliya': {
      hero: { src: '/assets/projects/proj-03-herzliya-hero.png', width: 1122, height: 1402, alt: 'תצלום של דירה בהרצליה פיתוח' },
      overlays: {
        annotation:    { src: '/assets/projects/overlay-p3-annotation.png',     width: 1774, height: 887,  alt: 'הערה בכתב יד' },
        beforeInset:   { src: '/assets/projects/overlay-p3-before-inset.png',   width: 1254, height: 1254, alt: 'תצלום הדירה לפני שיפוץ' },
        floorplanCard: { src: '/assets/projects/overlay-p3-floorplan-card.png', width: 1254, height: 1254, alt: 'תכנית הדירה' },
      },
    },
    'apartment-raanana': {
      hero: { src: '/assets/projects/proj-04-raanana-hero.png', width: 1122, height: 1402, alt: 'תצלום של דירה ברעננה' },
      overlays: {
        annotation:  { src: '/assets/projects/overlay-p4-annotation.png',   width: 1916, height: 821,  alt: 'הערה בכתב יד' },
        arrowScurve: { src: '/assets/projects/overlay-p4-arrow-scurve.png', width: 1254, height: 1254, alt: 'חץ קישור' },
        beforeInset: { src: '/assets/projects/overlay-p4-before-inset.png', width: 1122, height: 1402, alt: 'תצלום הדירה לפני שיפוץ' },
        ceilingFan:  { src: '/assets/projects/overlay-p4-ceiling-fan.png',  width: 2172, height: 724,  alt: 'איור מאוורר תקרה' },
        swatches:    { src: '/assets/projects/overlay-p4-swatches.png',     width: 1586, height: 992,  alt: 'דוגמיות חומרים' },
      },
    },
  },
} as const
