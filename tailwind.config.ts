import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bob brand colors - deep purple theme
        bob: {
          purple: {
            50: '#f5f3f7',
            100: '#ebe7ef',
            200: '#d7cfdf',
            300: '#b9a9c7',
            400: '#9580aa',
            500: '#7a6090',
            600: '#654d77',
            700: '#533f61',
            800: '#3d2a4d',
            900: '#1e0a2e', // Deep purple background
            950: '#0d0418', // Darker accent
          },
          pink: {
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
          },
          orange: {
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
          },
          yellow: {
            400: '#facc15',
            500: '#eab308',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-agentic': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
        'gradient-agentic-glow': 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(249,115,22,0.2) 50%, transparent 70%)',
        'gradient-purple-glow': 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'agentic': '0 0 20px rgba(236,72,153,0.5), 0 0 40px rgba(249,115,22,0.3)',
        'purple-glow': '0 0 15px rgba(139,92,246,0.4)',
        'feature-hover': '0 0 12px currentColor',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'zoom-in': 'zoomIn 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(249,115,22,0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(236,72,153,0.6), 0 0 50px rgba(249,115,22,0.4)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
