import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        // Custom accent colors
        'red-accent': 'hsl(var(--red-accent))',
        'teal-accent': 'hsl(var(--teal-accent))',
        'blue-accent': 'hsl(var(--blue-accent))',
        'neutral-accent': 'hsl(var(--neutral-accent))',
        
        // Twilight palette for direct usage
        'space-cadet': {
          DEFAULT: '#1f2041',
          100: '#06070d',
          200: '#0d0d1a',
          300: '#131427',
          400: '#191a34',
          500: '#1f2041',
          600: '#3a3c79',
          700: '#585bae',
          800: '#8f91c9',
          900: '#c7c8e4'
        },
        'english-violet': {
          DEFAULT: '#4b3f72', 
          100: '#0f0d17',
          200: '#1e192e', 
          300: '#2d2645', 
          400: '#3c335c', 
          500: '#4b3f72', 
          600: '#67579e',
          700: '#8c7fb8', 
          800: '#b2a9d0',
          900: '#d9d4e7'
        },
        'paynes-gray': {
          DEFAULT: '#19647e',
          100: '#05141a',
          200: '#0a2933',
          300: '#0f3d4d',
          400: '#145266',
          500: '#19647e',
          600: '#2596bb',
          700: '#4cb8dc',
          800: '#88d0e7',
          900: '#c3e7f3'
        },
        'ash-gray': {
          DEFAULT: '#a8b7ab',
          100: '#202621',
          200: '#404d43',
          300: '#607364',
          400: '#829787',
          500: '#a8b7ab',
          600: '#bac5bc',
          700: '#cbd4cd',
          800: '#dde2de',
          900: '#eef1ee'
        },
        'bittersweet': {
          DEFAULT: '#ff6663',
          100: '#460100',
          200: '#8d0200',
          300: '#d30400',
          400: '#ff1e1b',
          500: '#ff6663',
          600: '#ff8381',
          700: '#ffa2a0',
          800: '#ffc1c0',
          900: '#ffe0df'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
