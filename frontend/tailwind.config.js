/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'project-red': "#e50914",
        'project-gray': "#161515"
      }
    },
  },
  plugins: [],
}