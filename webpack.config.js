const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcDir = './src';

module.exports = {
  devServer: {
    contentBase: '/',
    historyApiFallback: true,
    inline: true,
    port: 2222
  },
  devtool: 'source-map',
  entry: {
    index: `${srcDir}/index.tsx`
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              interpolate: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.[hash:12].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: `${srcDir}/index.html`
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};
