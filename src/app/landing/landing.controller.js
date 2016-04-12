import angular from 'angular';
import uiRouter from 'angular-ui-router';


// import MODULE_NAME from

let login = () => {
  return {
    template: require('./landing.html'),
    controller: 'LandingCtrl',
    controllerAs: 'landing'
  }
};

class LoginCtrl {
  constructor() {
    this.url = 'https://liyutech.com/fc';
  }
}


const landingModule = angular.module('app.landing', [uiRouter])
  .config(['$stateProvider', function($stateProvider) {
    console.log('class landing ' + $stateProvider);
    $stateProvider.state('landing', {
    	url: '/landing',
    	template: require('./landing.html'),
    	controller: 'LandingCtrl'
  	});
  }])
.controller('LandingCtrl', ['$scope', LoginCtrl]);


export default landingModule;
