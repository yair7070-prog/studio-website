import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone:     '#F4EFE8',
        sand:     '#EAE2D6',
        mushroom: '#D6CBBB',
        stone:    '#B8AE9F',
        taupe:    '#6E6358',
        espresso: '#2B2420',
        clay:     '#A67B5B',
        walnut:   '#8B6B4A',
        bronze:   '#7D5E3C',
      },
      fontFamily: {
        serif:     ['var(--font-serif-he)', 'Georgia', 'serif'],
        sans:      ['var(--font-sans-he)', 'system-ui', 'sans-serif'],
        latin:     ['var(--font-latin-serif)', 'Georgia', 'serif'],
        latinSans: ['var(--font-latin-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-l':  ['clamp(2rem, 3vw + 1rem, 3rem)',       { lineHeight: '1.1',  letterSpacing: '-0.005em' }],
        'headline-m': ['clamp(1.5rem, 1.5vw + 1rem, 2rem)',   { lineHeight: '1.2' }],
        'body-l':     ['1.125rem',                             { lineHeight: '1.6' }],
        'body-m':     ['1rem',                                 { lineHeight: '1.65' }],
        'label':      ['0.75rem',                              { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'small':      ['0.875rem',                             { lineHeight: '1.5' }],
      },
      spacing: {
        'section-sm': '5rem',
        'section':    '7.5rem',
        'section-lg': '10rem',
        'section-xl': '12.5rem',
      },
      maxWidth: {
        container: '1440px',
      },
      transitionTimingFunction: {
        paper: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
