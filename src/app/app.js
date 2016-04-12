import angular from 'angular';

import uiRouter from 'angular-ui-router';

const users = require('json!./service/user.json');

console.log(`users ${users}`);

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
var reqControllers = require.context('.', true, /\.controller\.js$/);
let requiredControllers = requireAll(reqControllers, true);
requiredControllers.push(uiRouter);

console.log(`requiredControllers ${JSON.stringify(requiredControllers)}`);

const reqCssRules = require.context('.', true, /\.(c|le)ss$/);
requireAll(reqCssRules);

require("font-awesome-webpack");

// install caching service worker
import offline from 'offline-plugin/runtime'
offline.install();

window.MODULE_NAME = 'app';
const MODULE_NAME = window.MODULE_NAME;

angular.module(MODULE_NAME, requiredControllers);

export default MODULE_NAME;