/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8C2A8D",
        secondary: "#381952",
        themeBlack: "#18191F",
        primaryLight: "#7E6E8C",
        iconFooter: "#CAC2D1",
        iconFooterBg: "#644C79",
        primaryMediumLight: "#AC83CF",
        primaryDark: "#92278F",
        primaryInputBorder: "#E1D9E9",
        primaryGrey: "#F3F2F7",
        purpleLight: "#EFE8F5",
      },
      fontFamily: {
        'barlow': ['Barlow', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #7E6E8C 100%, #8C2A8D 100%)',
        'active-gradient': 'linear-gradient(113.51deg, #8C2A8D 44.17%, #BA88BE 85.97%, #8C2A8D 86.48%)',
      },

    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'mytheme': {
          primaryColor: '#8C2A8D',
        },
      },
      'light',
    ],
  },
}

