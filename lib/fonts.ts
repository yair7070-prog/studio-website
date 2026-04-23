import localFont from 'next/font/local'

export const davidLibre = localFont({
  src: [
    { path: '../public/fonts/david-libre-400.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-serif-he',
  display: 'swap',
  preload: true,
})

export const assistant = localFont({
  src: [
    { path: '../public/fonts/assistant-300.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/assistant-400.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-sans-he',
  display: 'swap',
  preload: true,
})

export const cormorantGaramond = localFont({
  src: [
    { path: '../public/fonts/cormorant-garamond-300.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/cormorant-garamond-400.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-latin-serif',
  display: 'swap',
  preload: false,
})

export const inter = localFont({
  src: [
    { path: '../public/fonts/inter-300.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/inter-400.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-latin-sans',
  display: 'swap',
  preload: false,
})
