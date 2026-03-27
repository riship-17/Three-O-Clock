/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',   // iPhone standard
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 1.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 2.5vw, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 4vw, 2.5rem)',
        'fluid-2xl': 'clamp(2rem, 5vw, 3.5rem)',
        'fluid-3xl': 'clamp(2.5rem, 7vw, 5rem)',
      },
      spacing: {
        'section': 'clamp(3rem, 8vw, 8rem)',
      },
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
