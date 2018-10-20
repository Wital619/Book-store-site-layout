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
					'css-loader',
          {
            loader: 'postcss-loader',
            options: {
							ident: 'postcss',
              plugins: () => [
                autoprefixer({
									browsers: [
										'>1%',
										'last 4 versions'
									]
								}),
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
      { from: 'src/images/', to: 'images/' }
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