/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080B',
          900: '#0B0B0F',
          800: '#131318',
          700: '#1A1A22',
          600: '#26262F',
        },
        violet: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        cyan: {
          400: '#5EEAD4',
          500: '#22D3EE',
          600: '#0891B2',
        },
        mist: {
          100: '#F5F5F7',
          300: '#C7C7D1',
          500: '#8B8B95',
          700: '#5A5A66',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grad-hero': 'radial-gradient(120% 120% at 50% 0%, #1A1A2E 0%, #0B0B0F 55%)',
        'grad-violet-cyan': 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(139,92,246,0.55)',
        'glow-cyan': '0 0 40px -8px rgba(34,211,238,0.5)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(30px,-20px) rotate(8deg)' },
          '100%': { transform: 'translate(0,0) rotate(0deg)' },
        },
        blink: {
          '0%,49%': { opacity: 1 },
          '50%,100%': { opacity: 0 },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        blink: 'blink 1.1s step-start infinite',
      },
    },
  },
  plugins: [],
}
