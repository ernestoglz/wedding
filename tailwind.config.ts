import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2541',
          light: '#223058',
          dark: '#131B30',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4BA8A',
          dark: '#B8956A',
        },
        'text-primary': '#FFFFFF',
        'text-muted': '#8B9DC3',
        'text-gold': '#C9A96E',
      },
      fontFamily: {
        serif: ['Quicksand', 'Georgia', 'sans-serif'],
        script: ['Imperial Script', 'cursive'],
        heading: ['Protest Riot', 'cursive'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Quicksand', 'Lato', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
