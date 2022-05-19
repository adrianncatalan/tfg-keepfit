module.exports = {
  content: ['./public/**/*.{html,js,hbs}',
    './views/**/*.{html,js,hbs}',
    './models/**/*.{html,js,hbs}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}