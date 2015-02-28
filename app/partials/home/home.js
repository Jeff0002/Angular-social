'use strict';

var app = angular.module('myApp.home', ['ngRoute'])


app.controller('homeCtrl', ['$scope','loginService',function ($scope,loginService) {
	$scope.txt='Page Home';
	$scope.logout=function(){
		loginService.logout();
	}
}]);