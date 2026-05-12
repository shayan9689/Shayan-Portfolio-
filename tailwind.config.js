/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'max-sm': {'max': '575px'},
      'max-md': {'max': '767px'},
      'max-lg': {'max': '991px'},
      'max-xl': {'max': '1199px'},
    },
    extend: {
      colors: {
        /* Coolors: #d8dbe2 #a9bcd0 #58a4b0 #373f51 #1b1b1e */
        primary: {
          DEFAULT: '#58a4b0',
          dark: '#46919e',
          light: '#7bc4cd',
        },
        copper: {
          DEFAULT: '#58a4b0',
          dark: '#46919e',
          light: '#7bc4cd',
        },
        navy: {
          DEFAULT: '#373f51',
          dark: '#1b1b1e',
          light: '#58a4b0',
        },
        darkGray: {
          DEFAULT: '#1b1b1e',
          section: '#252a34',
          card: '#22262f',
          border: '#3d4658',
        },
        secondary: '#373f51',
        accent: '#58a4b0',
        light: '#d8dbe2',
        dark: {
          DEFAULT: '#373f51',
          text: '#d8dbe2',
        },
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(180deg, #1b1b1e 0%, #373f51 48%, #58a4b0 78%, #a9bcd0 100%)',
        'dark-gradient-section': 'linear-gradient(180deg, #373f51 0%, #1b1b1e 100%)',
        'copper-metallic': 'linear-gradient(145deg, #a9bcd0 0%, #58a4b0 38%, #373f51 68%, #1b1b1e 100%)',
        'nav-metallic-light': 'linear-gradient(120deg, #d8dbe2 0%, #a9bcd0 38%, #58a4b0 72%, #d8dbe2 100%)',
        'nav-metallic-dark': 'linear-gradient(120deg, #1b1b1e 0%, #373f51 42%, #58a4b0 72%, #a9bcd0 100%)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'copper-glow': '0 0 24px rgba(88, 164, 176, 0.48)',
        'copper-metallic': 'inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 14px rgba(27, 27, 30, 0.5)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'loader-rotate': 'loader-rotate 2s linear infinite',
        'loader-spin': 'loader-spin 1.5s cubic-bezier(0.4, 0.1, 0.2, 0.8) infinite',
        'technologies-scroll': 'technologies-scroll 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' },
        },
        'loader-rotate': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'technologies-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'loader-spin': {
          '0%, 15%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
