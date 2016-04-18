'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const WebpackShellPlugin = require('webpack-shell-plugin');

const PROD_DOMAIN = 'domain';
const PROD_ROOT_PATH = '/' + PROD_DOMAIN;
const PreBuildTask = `ls -l ${PROD_DOMAIN} && rm -rf  ${PROD_DOMAIN} && ls -l ${PROD_DOMAIN}`;
const PROD_DEPLOY_PATH = '/www';
const PostBuildTask = `cp -r ${PROD_DOMAIN} ${PROD_DEPLOY_PATH}`;

module.exports = function makeWebpackConfig() {
  let config = {};
  config.entry = {
    app: './src/app/app.js'
  };

  config.output = {
    path: __dirname + PROD_ROOT_PATH,
    publicPath: PROD_ROOT_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  };

  config.devtool = 'source-map';

  config.module = {
    preLoaders: [],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }, 
    {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.html$/,
      loader: 'raw'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    },
    {
      test: /src\/public\/index\.html$/,
      loader: 'string-replace',
      query: {
        search: '<base href="/">',
        replace: `<base href="/${PROD_DOMAIN}/">`
      }
    }]
  };
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  config.plugins = [];

  config.plugins.push(
    new WebpackShellPlugin({
      onBuildStart: [PreBuildTask],
      onExit: [PostBuildTask]
    }),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),

    new ExtractTextPlugin('[name].[hash].css', {
      disable: false
    }),

    new webpack.NoErrorsPlugin(),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin(),

    new CopyWebpackPlugin(
      [{
        from: __dirname + '/src/public'
      }]),
    new OfflinePlugin({
      // All options are optional
      caches: 'all',
      scope: PROD_ROOT_PATH + '/',
      updateStrategy: 'all',
      version: 'v2',

      ServiceWorker: {
        output: 'sw.js'
      },

      AppCache: {
        directory: 'appcache/'
      }
    })
  )
  return config;
}();