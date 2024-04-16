/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{

        "arial": ""

      },
      colors: {
        "brand-100": "rgb(11, 37, 69)",
        "brand-200": "rgb(19, 49, 92)",
        "brand-300": "rgb(238, 244, 237)",
        "brand-400": "rgb(208, 186, 64)",
      },
      
    },
  },
  plugins: [],
}

