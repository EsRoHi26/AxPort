/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/app/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'tec-blue': '#002855',
        'tec-red': '#c4242c',
        'tec-title': '#105c7c',
      },
    },
  },
  plugins: [],
}

