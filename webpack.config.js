
const copyPlugin = require('copy-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    contentBase: PROD ? path.join(__dirname, 'docs') : path.join(__dirname, 'assets'),
    compress: true,
    hot: true,
    port: 8080,
  },
  devtool: PROD ? 'inline-source-map' : false,
  entry: ['whatwg-fetch', path.join(__dirname, 'src', 'index.js')],
  mode: PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'docs'),
    publicPath: '/',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new htmlPlugin({
      title: 'HopeBox - Connection Communities Saving Lives',
      filename: 'index.html',
      template: path.join(__dirname, 'assets', 'template.html'),
      inject: 'body',
      base: PROD ? 'https://pagarba.github.io/Hopebox-UI-MVP/' : 'http://localhost:8080/',
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
      {from: 'assets/sw.js', to: 'sw.js'},
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
