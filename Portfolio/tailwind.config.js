module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: '#8B5CF6',
          light: '#A78BFA',
          lighter: '#C084FC',
          dark: '#7C3AED',
          darker: '#6D28D9',
        },
        black: {
          bg: '#0A0A0F',
          secondary: '#14141F',
          tertiary: '#1E1E2E',
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 3s ease infinite',
        'float': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse 4s ease-in-out infinite',
        'rotate': 'rotateAnim 5s linear infinite',
        'rotate-reverse': 'rotateReverse 5s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-purple-intense': '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
