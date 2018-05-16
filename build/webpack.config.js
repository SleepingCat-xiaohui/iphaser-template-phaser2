const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin')
const path = require('path')
function resolve (...dir) {
  return path.resolve(__dirname, '../', ...dir)
}

const phaserModule = resolve('./node_modules/phaser')
const phaser = resolve(phaserModule, './build/custom/phaser-split.js')
const pixi = resolve(phaserModule, './build/custom/pixi.js')
const p2 = resolve(phaserModule, './build/custom/p2.js')

module.exports = {
  entry: {
    main: ['babel-polyfill', resolve('./src/index.js')],
    vender: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  output: {
    filename: '[name].js',
    path: resolve('./dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: resolve('./src')
    }, {
      test: /pixi\.js$/,
      loader: 'expose-loader?PIXI'
    }, {
      test: /p2\.js$/,
      loader: 'expose-loader?p2'
    }, {
      test: /phaser-split\.js$/,
      loader: 'expose-loader?Phaser'
    }]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   'PIXI': 'pixi',
    //   'p2': 'p2',
    //   'Phaser': 'phaser'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender',
      filename: 'vender.js'
    }),
    new HtmlWebpackPlugin({
      template: resolve('./src/index.html'),
      chunks: ['vender', 'main'],
      chunksSortMode: 'manual'
    }),
    new CopyWebpackPlugin([{ from: resolve('./src/assets'), to: resolve('./dist/assets') }]),
    new BrowserSyncWebpackPlugin({
      host: 'localhost',
      port: 8888,
      server: {
        baseDir: resolve('./dist')
      }
    })
  ],
  resolve: {
    alias: {
      phaser, pixi, p2
    }
  },
  devtool: 'cheap-source-map',
  watch: true
}
