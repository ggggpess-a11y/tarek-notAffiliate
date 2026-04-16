/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['Tajawal', 'system-ui', 'sans-serif'],
        headline: ['Tajawal', 'system-ui', 'sans-serif'],
        label: ['Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#090909',
        surface: '#0C0C0C',
        'on-background': '#FAFAFA',
        'on-surface': '#F5F5F5',
        'on-surface-variant': '#D4D4D4',
        primary: '#FFE082',
        'primary-container': '#FFC107',
        'on-primary-container': '#1D1400',
        outline: 'hsl(45 10% 42%)',
        'outline-variant': 'rgb(70 62 44)',
        'surface-container': '#141414',
        'surface-container-high': '#1D1D1D',
        'surface-container-highest': '#2A2A2A',
        'surface-container-low': '#111111',
        'surface-container-lowest': '#080808',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
