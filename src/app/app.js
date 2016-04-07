import angular from 'angular';

import uiRouter from 'angular-ui-router';

import './login/login.controller.js';

// var routes = require('./routes.js');


// console.log('require logine ...' + routes);


// necessary for css to work
import '../style/app.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

require("font-awesome-webpack");

// require('font-awesome');

// install caching service worker
// import offline from 'offline-plugin/runtime'

// offline.install();

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {

  constructor($scope, $state) {
    console.log('within AppCtrl');
    $state.go('home');

    this.url = 'login';
  }
}


// template: "HHHHHHHHHHHHHHHH",


// app.url = "https://liyutech.com/fc";
const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uiRouter, 'app.login'])
  // .directive('app', app)
  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    // $locationProvider.hashPrefix('');
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