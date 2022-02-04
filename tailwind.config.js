module.exports = {
  purge: {
    options: {
      safelist: ['bg-red', 'bg-blue', 'bg-yellow', 'bg-black', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6']
    },
  },
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
        '3xs': '.6rem',
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
      margin: {
        '13': '3.25rem',
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
    },
    screens: {
      'sm': '1024px',
      'md': '1081px',
      'lg': '1920px',
      'xl': '2560px',
    },
  },
  variants: {
  },
  plugins: [],
}
