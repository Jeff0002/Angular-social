'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'partials/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', [function() {

}]);

