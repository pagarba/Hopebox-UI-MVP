
const base = require('./webpack.core')
const copyPlugin = require('copy-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

module.exports = Object.assign({}, base, {
  devServer: Object.assign({}, base.devServer, {
    contentBase: PROD ? path.join(__dirname, 'docs', 'mobile') : path.join(__dirname, 'assets'),
  }),
  entry: ['whatwg-fetch', path.join(__dirname, 'mobile', 'index.js')],
  output: Object.assign({}, base.output, {
    path: path.join(__dirname, 'docs', 'mobile'),
  }),
  plugins: [
    new webpack.ProgressPlugin(),
    new htmlPlugin({
      title: 'HopeBox - Connection Communities Saving Lives',
      filename: 'index.html',
      template: path.join(__dirname, 'assets', 'template.html'),
      inject: 'body',
      base: PROD ? 'https://pagarba.github.io/Hopebox-UI-MVP/mobile/' : 'http://localhost:8080/mobile/',
      minify: PROD,
      hash: true,
      xhtml: true,
    }),
    new copyPlugin([
      {from: 'assets/css', to: 'css'},
      {from: 'assets/img', to: 'img'},
      {from: 'assets/browserconfig.xml', to: 'browserconfig.xml'},
      {from: 'assets/favicon.ico', to: 'favicon.ico'},
      {from: 'assets/manifest.json', to: 'manifest.json'},
    ]),
  ],
})
