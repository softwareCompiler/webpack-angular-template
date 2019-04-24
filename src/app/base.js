import angular from 'angular';

import uiRouter from 'angular-ui-router';
import _ from 'lodash';

import constants from './service/constants.json';

class AngularBaseClass {
	module() {
		let name = _.head(arguments);
		let dependencies = _.union([uiRouter], _.tail(arguments));
		let FullQualifiedModuleName = name ? AngularBaseClass.moduleName + '.' + name : AngularBaseClass.moduleName;
		return angular.module(FullQualifiedModuleName, dependencies);
	};
	static moduleName() {
		return constants.AppName;
	}
	static requireAll(requireContext, requireControllers) {
		return requireContext.keys().map(function(key) {
			var importModule = requireContext(key);
			if (requireControllers) {
							console.log(`???key yes ??? ${importModule.default.name}`);

				return importModule.default.name;
			} else {
				return key;
			}
		});
	}
};

export default AngularBaseClass;