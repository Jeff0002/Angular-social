'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute','myApp.login','myApp.home','myApp.version'])

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login/login.html',
        controller: 'loginCtrl'
    })
    .when('/home', {
        templateUrl: 'partials/home/home.html',
        controller: 'homeCtrl'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);
