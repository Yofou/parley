import { Config } from "tailwindcss"
import hocusPlugin from "tailwindcss-hocus"

export default {
  content: [
    './src/**/*.{svelte,html,css,js,ts}',
    '../../**/components/*.{svelte,html,css,js,ts}'
  ],
  theme: {
    colors: {
      red: {
        300: '#E63E6D',
        600: '#B42B51',
        900: '#7D1935',
        1200: '#420516',
      },
      white: '#FFF',
      grey: {
        300: '#5A698F',
        600: '#161D2F',
        900: '#10141E',
      }
    },
    fontFamily: {
      outfit: ["'Outfit'", 'sans-serif']
    },
    plugins: [hocusPlugin],
  }
} satisfies Config
