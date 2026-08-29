/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          950: '#0a1f14',
          900: '#0f2e1c',
          800: '#153d25',
          700: '#1c4d30',
          600: '#245f3c',
          500: '#2e7548',
        },
        amber: {
          400: '#f0b429',
          500: '#e29d0e',
          600: '#c2820a',
        },
        surface: {
          DEFAULT: '#f7f7f3',
          card: '#ffffff',
          sunken: '#f0efe9',
        },
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: {
        card: '0 1px 2px rgba(15,46,28,0.06), 0 8px 24px -12px rgba(15,46,28,0.12)',
        cardHover: '0 2px 4px rgba(15,46,28,0.08), 0 16px 32px -12px rgba(15,46,28,0.18)',
      },
    },
  },
  plugins: [],
}
