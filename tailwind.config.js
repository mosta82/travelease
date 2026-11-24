/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#102A43',
          dark: '#0b1d30',
          light: '#24456b',
        },
        secondary: {
          DEFAULT: '#1769AA',
          dark: '#104d7e',
          light: '#2285d8',
        },
        accent: {
          DEFAULT: '#19A7A0',
          dark: '#12817b',
          light: '#25cfc6',
        },
        surface: {
          DEFAULT: '#F4F7FA',
          card: '#FFFFFF',
          subtle: '#E8EEF5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(16, 42, 67, 0.08), 0 2px 6px -2px rgba(16, 42, 67, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(16, 42, 67, 0.14), 0 4px 10px -2px rgba(16, 42, 67, 0.06)',
        'premium': '0 20px 40px -10px rgba(16, 42, 67, 0.18)',
      }
    },
  },
  plugins: [],
}
