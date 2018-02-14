import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: { // in case we want to have more than one bundle, we could point many entry points (as field of object),
    // in case we have big project, for example we can splin every bundle for every. page
    // but we need to use additional plugin to actually split it: see CommonsChunkPlugin, without it splitting won`t actually help as all bundles will be in main lib.
    main: path.resolve(__dirname, 'src/main'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js' // now it should be named main as pointed in entry point(?);used to be 'bundle.js' +
                                      // we added hashing so we can refer to the same file and if file changes -> hash changes as well
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Mimfy JS
    new webpack.optimize.UglifyJsPlugin(),

    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // name pointed in entry point!
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({ // it will generate index.html file for our prod folder ->dist
      template: 'src/index.html', // and take our index.html as a template
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }
}
