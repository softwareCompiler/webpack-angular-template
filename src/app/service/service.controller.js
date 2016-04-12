'use strict';

import angular from 'angular';
import _ from 'lodash';

const module = require('json!./module.json');

const users = require('json!././user.json');


const serviceModule = angular.module('service', [])
	.factory('dao', function() {
		var factory = {};
		factory.LoginService = function(userLogin) {
			// simulating an asynchronous operation such as an ajax request
			var promise = new Promise(function(resolve, reject) {
				if (_.find(users, userLogin)) {
					console.log(`LoginService user resolved`);
					resolve({
						"StatusCode": 200,
						"Data": users
					});
				} else {
					resolve({
						"StatusCode": 404,
						"Data": []
					});
				}
			});
			return Rx.Observable.fromPromise(promise);
		};
		return factory;
	});


export default serviceModule;