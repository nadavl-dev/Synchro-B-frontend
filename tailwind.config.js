/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        synchro: {
          'light-base': '#ECECEC',
          'dark-base': '#2D2D2D',
          'gold': '#C4A747',
          'white': '#FFFFFF',
          'sky-blue': '#4A9FF5',
          'sage-green': '#6BA87C',
          'coral-red': '#E67E5E',
          'warm-beige': '#F5E6D3',
          'dark-gray': '#3E3E3E',
          'medium-gray': '#888888',
          'light-gray': '#D9D9D9',
          'very-light-gray': '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
    },
  },
  plugins: [],
};
