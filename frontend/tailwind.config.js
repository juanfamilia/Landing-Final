/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'siete-navy': '#182E5B',
        'siete-navy-light': '#2A4A8A',
        'siete-navy-dark': '#0F1D3E',
        'siete-teal': '#3CEEAF',
        'siete-teal-light': '#6FF2C0',
        'siete-teal-dark': '#2BB88A',
        'siete-green': '#80E897',
        'siete-green-light': '#A3F0B0',
        'siete-green-dark': '#5FD674',
      }
    },
  },
  plugins: [],
}
