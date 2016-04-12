import angular from 'angular';
import uiRouter from 'angular-ui-router';


// import MODULE_NAME from

const landingModule = angular.module('app.landing', [uiRouter])
  .config(['$stateProvider', function($stateProvider) {
    console.log('class landing ' + $stateProvider);
    $stateProvider.state('landing', {
    	url: '/landing',
    	template: require('./landing.html'),
    	controller: 'LandingCtrl'
  	});
  }])
.controller('LandingCtrl', ['$scope', function($scope) {
    console.log('class LandingCtrl ' + $scope);
}]);


export default landingModule;