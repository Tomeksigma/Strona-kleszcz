/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e6f4ea', // [cite: 3]
          DEFAULT: '#2e7d32', // 
          dark: '#1b5e20', // 
          accent: '#fbc02d', // 
        }
      }
    }
  },
  plugins: [],
}