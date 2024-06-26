/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gray':'#1A2234',
        'secondary-gray':'#252E44',
        'primary-red':'#E32A3C',
        'primary': '#44B066',
        'secondry': '#44B066ad'
      }
    },
  },
  plugins: [],
  variants:{
    extend:{
      display: ["focus-group"]
    }
  }
}

