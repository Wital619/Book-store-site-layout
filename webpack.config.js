const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  entry: ['./src/js/scripts.js'],
  output: {
    filename: 'js/scripts.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [
                autoprefixer
              ]
            },
          },
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        js: {
          test: /\.js$/,
          name: 'commons',
          chunks: 'all',
          minChunks: 7,
        },
        css: {
          test: /\.(css|sass|scss)$/,
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: './index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CopyWebpackPlugin([
      { from: 'src/images/' }
    ]),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: 'dist',
    overlay: true,
    open: true,
    openPage: 'index.html',
  }
};