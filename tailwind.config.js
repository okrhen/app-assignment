module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#d70a13'
      },
      backgroundColor: {
        primary: '#d70a13'
      },
      gridTemplateRows: {
        '30-70': '30% 70%'
      }
    },
    minHeight: {
      12: '12rem',
      30: '30rem'
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
