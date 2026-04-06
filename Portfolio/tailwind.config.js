module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          primary: '#64FFDA',
          light: '#94FFEB',
          lighter: '#CCFFF5',
          dark: '#45B29D',
          darker: '#0A192F',
        },
        slate: {
          950: '#020617',
          900: '#0F172A',
          800: '#1E293B',
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
        'glow-cyan': '0 0 20px rgba(100, 255, 218, 0.3), 0 0 40px rgba(100, 255, 218, 0.1)',
        'glow-cyan-intense': '0 0 30px rgba(100, 255, 218, 0.5), 0 0 60px rgba(100, 255, 218, 0.3)',
      },
    },
  },
  plugins: [],
}
