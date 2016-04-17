'use strict';

import angular from 'angular';
import _ from 'lodash';

const users = require('json!././user.json');

const serviceModule = angular.module('service', [])
	.factory('dao', function() {
		const factory = {};
		let _userLogin = false;
		factory.LoginService = function(userLogin) {
			// simulating an asynchronous operation such as an ajax request
			const promise = new Promise(function(resolve, reject) {
				if (_.find(users, userLogin)) {
					console.log(`LoginService user resolved`);
					_userLogin = true;
					resolve({
						"StatusCode": 200,
						"Data": users
					});
				} else {
					_userLogin = false;
					resolve({
						"StatusCode": 404,
						"Data": []
					});
				}
			});
			return Rx.Observable.fromPromise(promise);
		};
		factory.hasLoggedIn = function() {
			return _userLogin;
		};
		factory.logout = function() {
			_userLogin = false;
		}
		return factory;
	});

serviceModule.constants = require('json!./constants.json');

serviceModule.createModule = function(submoduleName) {
	if (submoduleName) {
		return serviceModule.constants.AppName + '.' + submoduleName;
	}
	return serviceModule.constants.AppName;
};
export default serviceModule;