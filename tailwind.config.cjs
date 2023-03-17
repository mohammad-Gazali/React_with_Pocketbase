/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald"],
  },
}
