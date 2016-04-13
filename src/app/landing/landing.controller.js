import angular from 'angular';
import uiRouter from 'angular-ui-router';


const landingModule = angular.module('app.landing', [uiRouter])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('landing', {
    	url: '/landing',
      params: {
        Users: []
      },
    	template: require('./landing.html'),
    	controller: 'LandingCtrl'
  	});
  }])
.controller('LandingCtrl', ['$scope','$stateParams', function($scope, $stateParams) {
    console.log('users LandingCtrl ' + JSON.stringify($stateParams.Users));
    $scope.Users = $stateParams.Users;
}]);


export default landingModule;