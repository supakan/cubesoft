const webpack = require('webpack');
const path = require('path');
const config = require('../config');

module.exports = {
  devtool: 'eval',
  entry: [
    // patch hot-loader
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${config.host}:${config.clientPort}`,
    // ยังจำได้ไหม webpack-der-server เราทำได้ทั้ง hot และ inline
    // แต่เราต้องการแค่ hot module replacement
    // เราไม่ต้องการ inline ที่จะแอบทะลึ่งไป reload เพจของเรา
    // เราจึงบอกว่าใช้ hot เท่านั้นนะ
    'webpack/hot/only-dev-server',
    './ui/theme/elements.scss',
    './ui/index.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    publicPath: `/static/`,
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
  test: /\.(png|jpeg|ttf|...)$/,
  use: [
   { loader: 'url-loader', options: { limit: 8192 } }
   // limit => file.size =< 8192 bytes ? DataURI : File
  ]
},
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              sourceMap: true,
              module: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            query: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          },
          {
             loader: 'postcss-loader'
           }
        ]
      }
    ]
  },
  devServer: {
    port: config.clientPort,
    hot: true,
    inline: false,
    historyApiFallback: true
  }
};
