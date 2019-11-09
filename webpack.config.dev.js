const autoprefixer = require('autoprefixer');
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  stats: {
    // TODO: review what settings will work for our config,
    // these may have no effect in node
    // copied from `'minimal'`
    all: true,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    // our additional options
    moduleTrace: true,
    colors: true,
    errorDetails: true,
  },
  devtool: 'source-map',
  // Learn more: httwebpack:///.ps://webpack.js.org/concepts/mode/
  mode: 'development',

  // This is the entry point of the Webpack
  entry: [
    path.resolve(__dirname, 'src/index'),
  ],

  target: 'web', // 'web', 'node', 'elektron'

  output: {// path & file names of build specified but served from memory
    // no physical files created fyi
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [ // defines things like hot-reloading, linting, caching, styles...
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: true,
      showErrors: true,
    }),
  ],

  module: {
    rules: [// define how to handle different file types
      {// handle .scss files
        test: /\.scss$/,
        use: [
          // {loader: 'file-loader',
          //   options: {name: 'bundle.css'},
          // },
          // {loader: 'extract-loader'},
          {loader: 'style-loader'},
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
      {// include .js files
        test: /\.jsx?$/, // why not /\.js$/ TODO: why
        // preload the jshint loader
        enforce: 'pre',
        // exclude any and all files in the node_modules folder
        exclude: /node_modules/,
        // As of webpack 2.0.0, the -loader suffix is not allowed to be omitted
        loaders: ['babel-loader'],
      },
    ],
  },
};
