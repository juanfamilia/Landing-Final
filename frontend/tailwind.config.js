import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        siete: {
          navy: {
            DEFAULT: '#182E5B',
            light: '#2A4A8A',
            dark: '#0F1D3E',
          },
          teal: {
            DEFAULT: '#3CEEAF',
            light: '#6FF2C0',
            dark: '#2BB88A',
          },
          green: {
            DEFAULT: '#80E897',
            light: '#A3F0B0', 
            dark: '#5FD674',
          }
        }
      }
    },
  },
  plugins: [],
};

export default config;
