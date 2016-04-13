import angular from 'angular';

import uiRouter from 'angular-ui-router';
import _ from 'lodash';

import serviceModule from './service/service.controller.js';

class AngularBaseClass {
	constructor() {
		this._baseModuleName = 'app';
	}
	module() {
		let name = _.head(arguments);
		let dependencies = _.union([uiRouter], _.tail(arguments));
		console.log(`name ${name} dependencies ${dependencies} ${dependencies.length} ++++++++++`);
		let FullQualifiedModuleName = name ? this._baseModuleName + '.' + name : this._baseModuleName;
		console.log(`FullQualifiedModuleName ${FullQualifiedModuleName}`);
		return angular.module(FullQualifiedModuleName, dependencies);
	};
	static moduleName() {
		return 'app';
	}
	static requireAll(requireContext, requireControllers) {
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
};

export default AngularBaseClass;