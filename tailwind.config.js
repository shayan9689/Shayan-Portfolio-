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
        primary: {
          DEFAULT: '#5C8374',
          dark: '#183D3D',
          light: '#93B1A6',
        },
        copper: {
          DEFAULT: '#5C8374',
          dark: '#183D3D',
          light: '#93B1A6',
        },
        navy: {
          DEFAULT: '#183D3D',
          dark: '#040D12',
          light: '#5C8374',
        },
        darkGray: {
          DEFAULT: '#040D12',
          section: '#183D3D',
          card: '#0B1D22',
          border: '#5C8374',
        },
        secondary: '#183D3D',
        accent: '#5C8374',
        light: '#E7F0EC',
        dark: {
          DEFAULT: '#040D12',
          text: '#E7F0EC',
        },
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(180deg, #040D12 0%, #183D3D 52%, #5C8374 78%, #93B1A6 100%)',
        'dark-gradient-section': 'linear-gradient(180deg, #183D3D 0%, #040D12 100%)',
        'copper-metallic': 'linear-gradient(145deg, #93B1A6 0%, #5C8374 42%, #183D3D 72%, #040D12 100%)',
        'nav-metallic-light': 'linear-gradient(120deg, #E7F0EC 0%, #93B1A6 35%, #5C8374 70%, #E7F0EC 100%)',
        'nav-metallic-dark': 'linear-gradient(120deg, #040D12 0%, #183D3D 42%, #5C8374 72%, #93B1A6 100%)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'copper-glow': '0 0 24px rgba(147, 177, 166, 0.42)',
        'copper-metallic': 'inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 14px rgba(4, 13, 18, 0.45)',
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
