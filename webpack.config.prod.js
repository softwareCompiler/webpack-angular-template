'use strict';


const common = require('./webpack.common.config.js');

const config = common.config;

const webpack = require('webpack');
const PreBuildTask = `ls -l ${common.OUTPUT_DIR} && rm -rf  ${common.OUTPUT_DIR} && ls -l ${common.OUTPUT_DIR}`;
const PROD_DEPLOY_PATH = '/www';
const PostBuildTask = `cp -r ${common.OUTPUT_DIR} ${PROD_DEPLOY_PATH}`;


const OfflinePlugin = require('offline-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function() {
    config.devtool = 'source-map';
    // rewrite the base href in index.html
    common.addLoader({
        test: /src\/public\/index\.html$/,
        loader: 'string-replace',
        query: {
            search: '<base href="/">',
            replace: `<base href="/${common.OUTPUT_DIR}/">`
        }
    });
    config.plugins.push(
        new WebpackShellPlugin({
            onBuildStart: [PreBuildTask],
            onExit: [PostBuildTask]
        }),
        common.htmlWebpackPlugin,
        //common.extractTextPlugin(false),
        common.miniCssExtractPlugin,
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
            scope: common.PUBLIC_PATH + '/',
            updateStrategy: 'all',
            version: 'v2',

            ServiceWorker: {
                output: 'sw.js'
            },

            AppCache: {
                directory: 'appcache/'
            }
        })
    );
    return config;
}();