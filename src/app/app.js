import angular from 'angular';

import uiRouter from 'angular-ui-router';

function requireAll(requireContext, requireControllers) {
  return requireContext.keys().map(function(key) {
    console.log(`key ${key}`);
    var importModule = requireContext(key);
    if (requireControllers) {
      return importModule.default.name;
    }
    else {
      return key;
    }
  });
}

// See https://webpack.github.io/docs/context.html for inspiration
var reqControllers = require.context('.', true, /\.controller\.js$/);
let requiredControllers = requireAll(reqControllers, true);
requiredControllers.push(uiRouter);

// const reqCssRules = require.context('.', true, /\.\(c|le\)ss$/);
const reqCssRules = require.context('..', true, /\.(c|le)ss$/);
requireAll(reqCssRules);

// necessary for css to work
import '../../node_modules/font-awesome/css/font-awesome.min.css';

require("font-awesome-webpack");

// install caching service worker
import offline from 'offline-plugin/runtime'
offline.install();

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, requiredControllers)
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider.state('home', {
      url: '/',
      template: require('./app.html'),
      controller: 'AppCtrl'
    });
  }])
  .controller('AppCtrl', ['$scope', '$state', function($scope, $state) {
    console.log('within AppCtrl');
  }]);

export default MODULE_NAME;