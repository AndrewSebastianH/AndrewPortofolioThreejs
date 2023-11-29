/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        metropolis: 'Metropolis',
        aqua: 'Aqua',
      },
      fontSize: {
        '2xs': '0.625em', // 10px
        xs: '0.75em', // 12px
        sm: '0.875em', // 14px
        md: '1em', // 16px
        lg: '1.125em', // 18px
        xl: '1.5em', // 24px
        '2xl': '1.75em', // 28px
        '3xl': '3em', // 48px
        '4xl': '5em', // 80px
        '5xl': '6.25em', // 100px
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  important: true,
}
