import angular from 'angular';
import uiRouter from 'angular-ui-router';

import $ from 'jquery';

import Rx from 'rx';

const homeModule = angular.module('app.home', [uiRouter])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'HomeCtrl'
    });
  }])
  .controller('HomeCtrl', ['$scope', '$state', function($scope, $state) {
    console.log('within HomeCtrl');
    $scope.date = new Date();
    var userField = $('#User');
    var subscriber = function(data) {
      console.log(`dataaaaaaaaaa ${data}`);
    }
    var keyups = Rx.Observable.fromEvent(userField, 'keyup')
      .map(function(e) {
        return 'key was pressed ' + e.target.value;
      })
      .throttle(500)
      .distinctUntilChanged().subscribe(subscriber);
    $state.go('home');
  }]);


export default homeModule;