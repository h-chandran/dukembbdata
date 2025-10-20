/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        duke: {
          blue: '#003087',
          'blue-light': '#1a4ba0',
          'blue-dark': '#002366',
          gold: '#FFD700',
        },
        'cameron': {
          'hype-1': '#ff6b6b',
          'hype-2': '#ffa726',
          'hype-3': '#66bb6a',
          'hype-4': '#42a5f5',
          'hype-5': '#ab47bc',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'hype-pulse': 'hypePulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        hypePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
