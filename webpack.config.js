var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: ['./js/main.js'],
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: 'js/main.bundle.[hash].js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Modernizr': 'modernizr'
    }),
    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true
    }),
    function() {
      this.plugin('done', function(stats) {
        fs.writeFileSync(path.join(__dirname, 'src/_data', 'webpack.yml'), 'hash: "' + stats.hash + '"');
      });
    }
  ],
  externals: {
    jquery: 'jQuery',
    modernizr: 'Modernizr'
  }
};