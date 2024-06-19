/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: {
          base: 'var(--color-text-base)',
          gray: 'var(--color-text-gray)',

        }
      },
      backgroundColor: {
        base: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
        },
        button: {
          primary: 'var(--color-button-primary)',
          secondary: 'var(--color-button-secondary)'

        }
      },

    }
  },
  plugins: [],
}