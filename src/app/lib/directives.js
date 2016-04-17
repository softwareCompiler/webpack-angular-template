import angular from 'angular';

export default angular.module('directives', ['service'])
  .directive('navBar', ['dao', function(dao) {
    function link(scope, element) {
      scope.date = new Date();
      scope.hasLoggedIn = dao.hasLoggedIn;
    };
    return {
      restrict: 'A',
      link: link,
      template: require('./nav-tpl.html')
    };
  }]);