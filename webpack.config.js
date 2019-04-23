'use strict';

const common = require('./webpack.common.config.js');

common.publicPath('https://localhost:8080/');

const config = common.config;

module.exports = function() {
    config.devtool = 'eval-source-map';
    config.plugins.push(
        common.htmlWebpackPlugin,
       // common.extractTextPlugin(true)
        common.miniCssExtractPlugin(true)
    );
    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };
    return config;
}();