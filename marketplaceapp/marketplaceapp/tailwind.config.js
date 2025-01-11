/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient': 'gradientBG 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 6s ease-in-out infinite',
        'gradient-x': 'gradientX 10s ease infinite',
        'fadeIn': 'fadeIn 2s ease-out forwards',
        'fadeInDelayed': 'fadeIn 2s ease-out 1s forwards',
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200%',
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(270deg, #ff7e5f, #feb47b, #86A8E7, #7F7FD5)',
      },
    },
  },
  plugins: [],
}
