/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#667eea',
          600: '#5a67d8',
        },
        secondary: {
          500: '#764ba2',
          600: '#6b46c1',
        },
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-blue-purple': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}
