/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Override default blue colors with Duke colors
        blue: {
          50: '#F0F6FF',
          100: '#E0EDFF',
          200: '#C2DBFF',
          300: '#8BB8FF',
          400: '#4A8BFF',
          500: '#00539B', // Duke Royal Blue
          600: '#004280',
          700: '#003A6B',
          800: '#002D56',
          900: '#002041',
        },
        duke: {
          blue: '#00539B',
          'blue-light': '#1A6BB3',
          'blue-dark': '#003A6B',
          'blue-50': '#F0F6FF',
          'blue-100': '#E0EDFF',
          'blue-200': '#C2DBFF',
          'blue-300': '#8BB8FF',
          'blue-400': '#4A8BFF',
          'blue-500': '#00539B',
          'blue-600': '#004280',
          'blue-700': '#003A6B',
          'blue-800': '#002D56',
          'blue-900': '#002041',
        },
        complementary: {
          orange: '#FF6B35',
          'orange-light': '#FF8A5B',
          'orange-dark': '#E55A2B',
          gold: '#FFD700',
          'gold-light': '#FFE55C',
          'gold-dark': '#E6C200',
          silver: '#C0C0C0',
          'silver-light': '#E8E8E8',
          'silver-dark': '#A0A0A0',
        }
      },
    },
  },
  plugins: [],
};
