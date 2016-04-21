import angular from 'angular';

// install caching service worker
import offline from 'offline-plugin/runtime'
offline.install();

// vendor provided resources
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../node_modules/font-awesome/css/font-awesome.min.css');
require("font-awesome-webpack");

const angularResourceUtil = require('webpack-angular-resource-plugin');
angularResourceUtil.requireAll(require.context('.', true, /\.(c|le)ss$/));
const submodules = angularResourceUtil.requireAll(require.context('.', true, /(controller|service|directives)\.js$/));
const mainModule = angular.module('app', submodules)
	.config(['$locationProvider', '$urlRouterProvider', function($locationProvider, $urlRouterProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true,
			rewriteLinks: true
		});
		$urlRouterProvider.otherwise('home');
	}]);
export default mainModule;