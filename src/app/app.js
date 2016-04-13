import angular from 'angular';
import uiRouter from 'angular-ui-router';

require("font-awesome-webpack");

// install caching service worker
import offline from 'offline-plugin/runtime'
offline.install();

import AngularBaseClass from './base';
// confusing because the line below returns undefined.
console.log(`AngularBaseClass moduleName ${AngularBaseClass.moduleName()}`);

const reqCssRules = require.context('.', true, /\.(c|le)ss$/);
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../node_modules/font-awesome/css/font-awesome.min.css');
AngularBaseClass.requireAll(reqCssRules);


var reqControllers = require.context('.', true, /\.controller\.js$/);
// See https://webpack.github.io/docs/context.html for inspiration
let requiredControllers = AngularBaseClass.requireAll(reqControllers, true);
export default angular.module(AngularBaseClass.moduleName(), requiredControllers);