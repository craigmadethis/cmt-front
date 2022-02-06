// declare nesting before tailwind
module.exports = {
  plugins: {
    'postcss-import':{},
    '@tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
  },
}
