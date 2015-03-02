'use strict';

var app = angular.module('myApp.home', ['ngRoute'])


app.controller('homeCtrl', ['$scope','$location','Data',function ($scope,$location,Data) {

	$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
}]);