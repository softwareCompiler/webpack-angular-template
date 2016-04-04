import angular from 'angular';
import uiRouter from 'angular-ui-router';


// necessary for css to work
import '../style/app.css';
// import '../../node_modules/font-awesome/css/font-awesome.min.css';

require("font-awesome-webpack");

// require('font-awesome');

// install caching service worker
import offline from 'offline-plugin/runtime'

console.log('require sw runtime offline ...' + uiRouter);

offline.install();

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {

  constructor($scope) {
    this.url = 'https://liyutech.com/fc';
  }
}

// app.url = "https://liyutech.com/fc";
const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uiRouter])
  .directive('app', app)
  .config(['$stateProvider', function($stateProvider) {
    console.log('class config $routeProvider ' + $stateProvider);

  }])
.controller('AppCtrl', ['$scope', AppCtrl]);

export default MODULE_NAME;