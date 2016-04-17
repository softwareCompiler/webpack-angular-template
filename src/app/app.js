import angular from 'angular';

// install caching service worker
import offline from 'offline-plugin/runtime'
offline.install();

// vendor provided resources
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../node_modules/font-awesome/css/font-awesome.min.css');
require("font-awesome-webpack");

var angularResourceUtil = require('webpack-angular-resource-plugin');
angularResourceUtil.requireAll(require.context('.', true, /\.(c|le)ss$/));
export default angular.module('app', angularResourceUtil.requireAll(require.context('.', true, /(controller|service|directives)\.js$/)));