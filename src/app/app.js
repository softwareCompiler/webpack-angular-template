import angular from 'angular';

import uiRouter from 'angular-ui-router';

// import './login/*.js';


// See https://webpack.github.io/docs/context.html for inspiration

var req = require.context('.', true, /\.controller\.js$/);

function requireAll(requireContext) {
  console.log('requireContext.id ' + requireContext.id);
  console.log('requireContext.keys ' + JSON.stringify(requireContext.keys()));

  return requireContext.keys().map(function(key) {
    console.log('key ' + key);
    var importModule = requireContext(key);
    console.log('importModule ' + JSON.stringify(importModule));
    return importModule.default.name;

  });
}

let requires = requireAll(req);
    console.log('requires ' + JSON.stringify(requires));


// necessary for css to work
import '../style/app.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

require("font-awesome-webpack");

// require('font-awesome');

// install caching service worker
// import offline from 'offline-plugin/runtime'

// offline.install();

const MODULE_NAME = 'app';

requires.push(uiRouter);

angular.module(MODULE_NAME, requires)
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    console.log('within root config ');

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