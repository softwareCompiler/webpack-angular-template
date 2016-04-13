import AngularBaseClass from '../base';

class LandingModule extends AngularBaseClass {
  constructor() {
    super(); // wihtout this call, will get HomeCtrl not defined error.
    return this.module('landing')
      .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('landing', {
          url: '/landing',
          params: {
            Users: []
          },
          template: require('./landing.html'),
          controller: 'LandingCtrl'
        });
      }])
      .controller('LandingCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
        console.log('users LandingCtrl99999 ' + JSON.stringify($stateParams.Users));
        $scope.Users = $stateParams.Users;
      }]);
  }
}
export default new LandingModule();