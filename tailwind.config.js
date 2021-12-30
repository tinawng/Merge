module.exports = {
  darkMode: false,
  theme: {
    colors: {
      'black': '#000',
      'gray': '#39373E',
      'white': '#FFF',
      'blue': '#33F',
      'red': '#F33',
      'yellow': '#FC3',
      'transparent': 'transparent'
    },
    extend: {
      fontSize: {
        '2xs': '.65rem',
      },
      height: {
        'fit': 'fit-content',
        '18': '4.5rem',
      },
      width: {
        'fit': 'fit-content',
        '18': '4.5rem',
      },
      zIndex: {
        '-1': '-1',
      },
      animation: {
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite var(--delay); opacity: 0;'
      },
      keyframes: {
        'ping-slow': {
          '1%': { opacity: 1 },
          '75%, 100%': { transform: 'scale(2)', opacity: 0 }
        }
      }
    }
  },
  variants: {
  },
  plugins: [],
}
