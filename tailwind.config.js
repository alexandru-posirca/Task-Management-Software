/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "black-main": "#000000",
      "white-main": "#FAFAF9",
      green: "#38af48",
      gray: {
        200: "#b9b9ba",
        500: "#171619",
      },
    },
    extend: {},
  },
  plugins: [],
}