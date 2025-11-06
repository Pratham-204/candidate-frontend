/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        pulse: 'blink 1s step-start infinite'
      },
      colors: {
        matrixGreen: '#00ff00',
        dark: '#000000',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}

