import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        'weather-blue': '#60A5FA',
        'weather-purple': '#7C3AED',
      },
    },
  },
  plugins: [],
} satisfies Config

