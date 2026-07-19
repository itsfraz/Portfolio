/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(250, 70%, 60%)',
        secondary: 'hsl(190, 80%, 60%)',
        accent: 'hsl(320, 80%, 60%)',
        bg: {
          body: '#f8fafc',
          panel: 'rgba(255, 255, 255, 0.7)',
          glass: 'rgba(255, 255, 255, 0.6)',
          dark: '#0f172a',
          darkPanel: 'rgba(30, 41, 59, 0.7)',
          darkGlass: 'rgba(15, 23, 42, 0.6)'
        },
        border: {
          glass: 'rgba(255, 255, 255, 0.4)',
          darkGlass: 'rgba(255, 255, 255, 0.08)'
        },
        text: {
          main: '#0f172a',
          muted: '#475569',
          darkMain: '#f1f5f9',
          darkMuted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'dark-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite',
        'marquee-scroll': 'marquee-scroll 30s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.1)', opacity: '0.3' },
        },
        'marquee-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
