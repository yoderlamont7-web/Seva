import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Основной фиолетовый
        purple: {
          DEFAULT: '#4A1A8C',
          dark: '#3A1270',
          deep: '#2C0E55',
          mid: '#6B2FB5',
          light: '#8A4FD6',
        },
        // Акцент — оранжевый
        accent: {
          DEFAULT: '#FF7A18',
          light: '#FFA53C',
        },
        cloud: '#F7F4FC',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4A1A8C 0%, #6B2FB5 100%)',
        'brand-gradient-deep':
          'linear-gradient(160deg, #2C0E55 0%, #4A1A8C 55%, #6B2FB5 100%)',
        'accent-gradient': 'linear-gradient(135deg, #FF7A18 0%, #FFA53C 100%)',
      },
      fontFamily: {
        heading: ['var(--font-unbounded)', 'sans-serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(74, 26, 140, 0.25)',
        accent: '0 10px 30px -8px rgba(255, 122, 24, 0.45)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
