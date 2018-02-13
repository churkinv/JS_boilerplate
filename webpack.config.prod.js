import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';


export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/main')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // Mimfy JS
    new webpack.optimize.UglifyJsPlugin(),

    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loaders: ['style', 'css'] }
    ]
  }
}
