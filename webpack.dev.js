var path = require('path');
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: ['webpack-hot-middleware/client', './js/main.js'],
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: 'js/main.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer')({ browsers: ['last 2 version', '> 1%', 'ie 8', 'ie 9', 'Safari >= 6'] })
                ];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Modernizr': 'modernizr'
    }),
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    }),
  ],
  externals: {
    jquery: 'jQuery',
    modernizr: 'Modernizr'
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, './dist'),
    publicPath: '/'
  }
};