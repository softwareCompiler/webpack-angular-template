import angular from 'angular';
import uiRouter from 'angular-ui-router';

import $ from 'jquery';
import _ from 'lodash';

import Rx from 'rx';

const homeModule = angular.module('app.home', [uiRouter, 'service'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'HomeCtrl'
    });
  }])
  .controller('HomeCtrl', ['$scope', '$state', 'dao', function($scope, $state, dao) {
    $scope.date = new Date();
    var source = Rx.Observable.combineLatest(
        keyupForField('User'),
        keyupForField('Password')
      )
      .map(function(data) {
        console.log(`dataaa7777777aaaaaaa ${JSON.stringify(data)}`);
        var userNamePasswordObj = _.reduce(data, function(acc, obj) {
          return _.extend(acc, obj);
        }, {});
        return userNamePasswordObj;
      })
      .distinctUntilChanged()
      .subscribe(dao.LoginService);
    $state.go('home');
  }]);

function keyupForField(theField) {
  return Rx.Observable.fromEvent($(`#${theField}`), 'keyup')
    .throttle(50)
    .map(function(e) {
      return {
        [theField]: e.target.value
      };

      // return { `${theField}`: e.target.value };
      // return e.target.value;

    });
}

export default homeModule;