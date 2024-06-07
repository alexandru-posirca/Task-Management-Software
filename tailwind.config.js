/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1200px",
    },
    colors: {
      "black-main": "#000000",
      "white-main": "#FAFAF9",
      green: {
        300: "#38af48",
        500: "#00d800"
      },
      gray: {
        100: "#e2e2e2",
        200: "#b9b9ba",
        300: "#787878",
        400: "#404040",
        500: "#171619",
      },
      cyan: {
        500: "#114547"
      },
      orange: {
        300: "#F9A602",
        500: "#ff4307"
      },
      blue: {
        500: "#0003ff"
      },
      red: {
        400: "#e14b3c"
      }
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}