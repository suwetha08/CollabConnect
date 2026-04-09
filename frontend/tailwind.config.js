/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)',
        'gradient-card':  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      boxShadow: {
        'glow':    '0 0 20px rgba(99,102,241,0.35)',
        'glow-lg': '0 0 40px rgba(99,102,241,0.25)',
        'card':    '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-up':   'fadeUp 0.5s ease-out both',
        'fade-in':   'fadeIn 0.4s ease-out both',
        'slide-in':  'slideIn 0.3s ease-out both',
        'blob':      'blob 8s infinite',
        'float':     'float 4s ease-in-out infinite',
        'shimmer':   'shimmer 1.8s infinite',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn:  { from: { transform: 'translateX(100%)', opacity: 0 }, to: { transform: 'translateX(0)', opacity: 1 } },
        blob:     { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-50px) scale(1.1)' }, '66%': { transform: 'translate(-20px,20px) scale(0.9)' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        shimmer:  { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
      },
    },
  },
  plugins: [],
};
