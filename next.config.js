const nextTranslate = require('next-translate')

module.exports = {
  reactStrictMode: true,
  ...nextTranslate(),
  images: {
    domains: [
      'img.icons8.com',
      '127.0.0.1',
      'testflow.pythonanywhere.com'
    ],
  },
}