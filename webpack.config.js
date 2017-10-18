var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

var isDevelopment = process.env.NODE_ENV === 'development';
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: ['./js/main.js'],
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: isProduction ? 'js/main.bundle.[hash].js' : 'js/main.bundle.js'
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
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Modernizr': 'modernizr'
    }),
    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true,
      disable: isDevelopment
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

if ( isDevelopment ) {
  module.exports.entry.unshift('webpack-hot-middleware/client');
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    })
  );
}

if ( isProduction ) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    function() {
      this.plugin('done', function(stats) {
        fs.writeFileSync(path.join(__dirname, 'src/_data', 'webpack.yml'), 'hash: "' + stats.hash + '"');
      });
    }
  );
}