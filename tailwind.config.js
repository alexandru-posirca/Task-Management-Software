/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
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
        500: "#171619",
      },
      cyan: {
        500: "#114547"
      },
      orange: {
        500: "#ff4307"
      },
      blue: {
        500: "#0003ff"
      }
    },
    extend: {},
  },
  plugins: [],
}