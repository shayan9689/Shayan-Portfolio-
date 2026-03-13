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
          DEFAULT: '#B87333',
          dark: '#8B4513',
          light: '#CD7F32',
        },
        copper: {
          DEFAULT: '#B87333',
          dark: '#8B4513',
          light: '#D4A574',
        },
        navy: {
          DEFAULT: '#B87333',
          dark: '#8B4513',
          light: '#CD7F32',
        },
        darkGray: {
          DEFAULT: '#3a3a3a',
          section: '#454545',
          card: '#4d4d4d',
          border: '#5c5c5c',
        },
        secondary: '#1e293b',
        accent: '#64748b',
        light: '#f8fafc',
        dark: {
          DEFAULT: '#3a3a3a',
          text: '#e5e7eb',
        },
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(180deg, #4d4d4d 0%, #3a3a3a 50%, #333333 100%)',
        'dark-gradient-section': 'linear-gradient(180deg, #454545 0%, #3a3a3a 100%)',
        'copper-metallic': 'linear-gradient(145deg, #D4A574 0%, #B87333 35%, #8B4513 70%, #A0522D 100%)',
        'nav-metallic-light': 'linear-gradient(120deg, #f5f5f5 0%, #e3e3e3 35%, #d0d0d0 70%, #f8f8f8 100%)',
        'nav-metallic-dark': 'linear-gradient(120deg, #555555 0%, #3f3f3f 35%, #323232 70%, #595959 100%)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'copper-glow': '0 0 20px rgba(184, 115, 51, 0.35)',
        'copper-metallic': 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(139, 69, 19, 0.4)',
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
