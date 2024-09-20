/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  
  theme: {
    extend: {
      colors: {
        customGreen: '#1DD1A1', // Add your custom color here
      },
    },
  },
  plugins: [],
}

