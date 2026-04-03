/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['Tajawal', 'system-ui', 'sans-serif'],
        headline: ['Tajawal', 'system-ui', 'sans-serif'],
        label: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#131313',
        surface: '#131313',
        'on-background': '#E5E2E1',
        'on-surface': '#E5E2E1',
        'on-surface-variant': '#D4C5AB',
        primary: '#FFE4AF',
        'primary-container': '#FFC107',
        'on-primary-container': '#6D5100',
        outline: 'hsl(38 15% 54%)',
        'outline-variant': 'rgb(79 70 50)',
        'surface-container': '#20201F',
        'surface-container-high': '#2A2A2A',
        'surface-container-highest': '#353535',
        'surface-container-low': '#1C1B1B',
        'surface-container-lowest': '#0E0E0E',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
