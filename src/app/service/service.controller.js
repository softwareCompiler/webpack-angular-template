'use strict';

import angular from 'angular';

const module = require('json!./module.json');
console.log(`module ${module.name}`);

const users = require('json!././user.json');

console.log(`users ${users}`);

const serviceModule = angular.module('service',[])
.factory('dao', function() {
	console.log('doing dao ...');
  var factory = {};
  factory.LoginService = function(user) {
  	console.log(`LoginService ${JSON.stringify(user)}`);
  	return user;
  }
  return factory;
});


export default serviceModule;