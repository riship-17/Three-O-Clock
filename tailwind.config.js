/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee': '#3c3c3c',
        'cream': '#eeebe2',
        'burnt-orange': '#8f908a',
        'olive': '#61615f',
        'charcoal': '#3c3c3c',
        'slate': '#61615f',
        'stone': '#8f908a',
        'linen': '#eeebe2',
        'bone': '#eeeee4',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Mozilla Headline', 'sans-serif'],
        mono: ['Iosevka Charon', 'Iosevka Charon Mono', 'monospace'],
        playful: ['Grandstander', 'cursive'],
        heading: ['Oswald', 'Space Grotesk', 'sans-serif'],
        serif: ['Noto Serif', 'Rasa', 'serif'],
        sketch: ['Londrina Sketch', 'cursive'],
        major: ['Major Mono Display', 'monospace'],
      },
    },
  },
  plugins: [],
}
