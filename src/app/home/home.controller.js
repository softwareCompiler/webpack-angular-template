import angular from 'angular';
import uiRouter from 'angular-ui-router';

import $ from 'jquery';
import _ from 'lodash';

import Rx from 'rx';


function requireAll(requireContext, requireControllers) {
  return requireContext.keys().map(function(key) {
    console.log(`key ${key}`);
    var importModule = requireContext(key);
    if (requireControllers) {
      return importModule.default.name;
    } else {
      return key;
    }
  });
}

// See https://webpack.github.io/docs/context.html for inspiration
var reqControllers = require.context('..', true, /service\.controller\.js$/);

let service = requireAll(reqControllers, true);
service.push(uiRouter)

// const service = require('../service/service.controller.js');
console.log(`within homeModule ${service} --- ${service.dao}`);


const homeModule = angular.module('app.home', service)
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'HomeCtrl'
    });
  }])
  .controller('HomeCtrl', ['$scope', '$state', 'dao', function($scope, $state, dao) {
 console.log(`within dao --- ${dao}`);

    $scope.date = new Date();
    var userStream = keyupForField('User');
    // userStream.subscribe(subscriber);
    var passwordStream = keyupForField('Password');
    // passwordStream.subscribe(subscriber);

    var source = Rx.Observable.combineLatest(
        userStream,
        passwordStream
      )
    .map(function(data) {
              console.log(`dataaaaaaaaaa ${JSON.stringify(data)}`);

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