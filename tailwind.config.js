module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'jost':['Jost'],
      'bitter':['Bitter'],
    },
    fontSize: {
      'p3': ['14px', {lineHeight:'14px',letterSpacing:'-0.025em'}],
      'p2': ['18px', {lineHeight:'18px',letterSpacing:'-0.025em'}],
      'p1': ['24px', {lineHeight:'24px',letterSpacing:'-0.025em'}],
      'h3': ['24px', {lineHeight:'24px',letterSpacing:'-0.075em'}],
      'h2': ['36px', {lineHeight:'36px',letterSpacing:'-0.075em'}],
      'h1': ['52px', {lineHeight:'48px',letterSpacing:'-0.075em'}],
      'd3': ['52px', {lineHeight:'38px',letterSpacing:'-0.12em'}],
      'd2': ['72px', {lineHeight:'52px',letterSpacing:'-0.12em'}],
      'd1': ['144px', {lineHeight:'112px',letterSpacing:'-0.12em'}],
    },
    colors: {
      "blue": {
        "50": "#aaebf2",
        "200": "#87d7e0",
        "400": "#5abcc7",
        "600": "#39a2ae",
        "900": "#3f858c"
      },
      "red": {
        "50": "#e55c7c",
        "200": "#cc3d5e",
        "400": "#bf2045",
        "600": "#a61c3c",
        "900": "#8c1833"
      },
      "emerald": {
        "50": "#59debd",
        "200": "#31c4a0",
        "400": "#22ab8a",
        "600": "#00916e",
        "900": "#00664d"
      },
      "orange": {
        "50": "#ff9380",
        "200": "#f87a63",
        "400": "#f8654a",
        "600": "#d44d35",
        "900": "#993826"
      },
      "yellow": {
        "50": "#ffc280",
        "200": "#ffaf59",
        "400": "#ffa340",
        "600": "#e8871e",
        "900": "#cc6f0a"
      },
      "green": {
        "50": "#add9b1",
        "200": "#8fbf93",
        "400": "#6b996e",
        "600": "#568259",
        "900": "#365938"
      },
      "gray": {
        "50": "#faf6ed",
        "200": "#e0ddd5",
        "400": "#bfbcb5",
        "600": "#808080",
        "800": "#575757",
        "900": "#242424"
      }},
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
