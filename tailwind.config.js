/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{svelte, html, js, ts}"],
  theme: {
    extend: {
      colors: {
      'indigo': '#08415C',
      'persian-red': '#CC2936',
      'comsic-latte': '#F8F4E3', 
      'ash-gray': '#A2A392', 
      'wisteria': '#BDADEA',
    }},
    
  },
  plugins: [],
}

