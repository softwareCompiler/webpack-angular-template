import angular from 'angular';
import uiRouter from 'angular-ui-router';

import $ from 'jquery';
import _ from 'lodash';

import Rx from 'rx';

const homeModule = angular.module('app.home', [uiRouter, 'service', 'app.landing'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'HomeCtrl'
    });
  }])
  .controller('HomeCtrl', ['$scope', '$state', 'dao', function($scope, $state, dao) {
    $scope.date = new Date();
    const buttonElement = $('#loginButton');
    Rx.Observable.fromEvent(buttonElement, 'click')
      .throttle(50)
      .flatMap(function() {
        var userNamePasswordObj = {
          "User": $scope.User,
          "Password": $scope.Password
        };
        return dao.LoginService(userNamePasswordObj);
      })
      .subscribe(function(response) {
        if (response.StatusCode === 200) {
          var users = _.map(response.Data, function(userObj) {
            return userObj.User;
          });
          $state.go('landing', {"Users": users});
        }
      });
    $state.go('home');
  }]);

export default homeModule;