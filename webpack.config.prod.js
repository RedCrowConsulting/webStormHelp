import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

export default {
  stats: {
    all: true,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    colors: true,
    errorDetails: true,
  },
  devtool: 'source-map',
  mode: 'production',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index'),
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    // hash the files using MD5 so that their names change when the content
    // changes part of 'busting the cache assumes servers are Setting
    // far future headers
    new WebpackMd5Hash(),
    // Generate an external css file with a hash in the file name
    // webpack 4.3 introduced a [contenthash] variable of it's own i'm told
    // https://github.com/webpack/webpack/releases/tag/v4.3.0
    // this workaround suggested in comments here
    // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/763
    // new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),
    // moving to MiniCssExtractPlugin per mulitple sites and articles like
    // this https://www.npmjs.com/package/sass-loader
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
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
        minifyURLs: true,
      },
      inject: true,
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: 'fa421fab45634ab6971a1fb260198abe',
      // for more configuration options, see https://docs.trackjs.com
    }),
    // By default in dev mode webpack 4 won't minimize js,
    // this is to speed up development. As soon as you switch mode to
    // production or use the -p while running webpack it will automatically
    // minimize your JS there is no need for uglifyjs setup anymore in webpack 4
    // minimize and dead code ellimination is internal to webpack now
  ],
  module: {
    rules: [
      {// handle .scss files
        test: /\.scss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {includePaths: ['./node_modules']},
            },
          },
        ],
      },
      {// js
        test: /\.jsx?$/, // why not /\.js$/ TODO: why
        // preload the jshint loader
        enforce: 'pre',
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {// include all types of chunks
      chunks: 'all',
    },
  },
};
