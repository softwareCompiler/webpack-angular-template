import angular from 'angular';
import uiRouter from 'angular-ui-router';


// import MODULE_NAME from

let login = () => {
  return {
    template: require('./login.html'),
    controller: 'LoginCtrl',
    controllerAs: 'login'
  }
};

class LoginCtrl {
  constructor() {
  	console.log('in login controller');
    this.url = 'https://liyutech.com/fc';
  }
}


const loginModule = angular.module('app.login', [uiRouter])
  .config(['$stateProvider', function($stateProvider) {
    console.log('class login ' + $stateProvider);
    $stateProvider.state('login', {
    	url: '/login',
    	template: require('./login.html'),
    	controller: 'LoginCtrl'
  	});
  }])
.controller('LoginCtrl', ['$scope', LoginCtrl]);


export default loginModule;
