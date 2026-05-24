import { Assistant } from 'next/font/google'
import localFont from 'next/font/local'

export const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '700'],
  variable: '--font-assistant',
  display: 'swap',
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
