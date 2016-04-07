import angular from 'angular';

import uiRouter from 'angular-ui-router';

// See https://webpack.github.io/docs/context.html for inspiration

var req = require.context('.', true, /\.controller\.js$/);

function requireAll(requireContext) {
  return requireContext.keys().map(function(key) {
    var importModule = requireContext(key);
    return importModule.default.name;
  });
}

let requires = requireAll(req);
requires.push(uiRouter);

// necessary for css to work
import '../style/app.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

require("font-awesome-webpack");

// install caching service worker
// import offline from 'offline-plugin/runtime'

// offline.install();

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, requires)
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
    // $state.go('home');

  }]);

export default MODULE_NAME;