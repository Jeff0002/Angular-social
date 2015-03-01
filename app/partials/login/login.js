'use strict';

var app = angular.module('myApp.login', ['ngRoute','ngAnimate','ngMessages']);

/* Controllers and directives */

app.controller('loginCtrl', ['$scope', 'loginService', 'Data',function ($scope,loginService,Data)  {
		$scope.msgtxt='';
		$scope.login=function(data){
			loginService.login(data,$scope); //call login service
		};

       /* $scope.login = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('home');
                }
            });
        };*/
}])

.controller('signupCtrl', ['$scope', 'signupService', function ($scope,signupService)  {

		var ctrl = this;
		ctrl.showEmailPrompt = false;
        ctrl.showUsernamePrompt = false;
        $scope.msgtxt='';

        $scope.signup = function(data){
				signupService.signup(data,$scope); //call signup service
		};

		ctrl.showMessages = function (field) {
        return ctrl.signupForm[field].$touched || ctrl.signupForm.$submitted
    	};

        ctrl.toggleEmailPrompt = function (value) {
            ctrl.showEmailPrompt = value;
        };

        ctrl.hasErrorClass = function (field) {
        	return ctrl.signupForm[field].$touched && ctrl.signupForm[field].$invalid;
    	};

        ctrl.toggleUsernamePrompt = function (value) {
            ctrl.showUsernamePrompt = value;
        };
   
        ctrl.getPasswordType = function(){
        	return ctrl.signupForm.showPassword ? 'text' : 'password';
        };

}])

/* Directives */

.directive('loginNavbar',function(){
	return{
		templateUrl: 'partials/login/navbar.html'
	}
})

.directive('loginJumbotron',function(){
	return{
		templateUrl: 'partials/login/jumbotron.html'
	}
})

.directive('signup',function(){
	return{
		templateUrl: 'partials/login/signup.html',
		controller: 'signupCtrl as ctrl'
	}
})

.directive('validatePasswordCharacters', function () {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            ngModel.$validators.lowerCase = function (value) {
                var pattern = /[a-z]+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };
     	    ngModel.$validators.upperCase = function (value) {
                var pattern = /[A-Z]+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };
            ngModel.$validators.number = function (value) {
                var pattern = /\d+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };
 /*             ngModel.$validators.specialCharacter = function (value) {
                var pattern = /\W+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };																	 */
            ngModel.$validators.eightCharacters = function (value) {
                return (typeof value !== 'undefined') && value.length >= 8;
            };  

        }
    }
})

.directive('loginContent',function(){
	return{
		templateUrl: 'partials/login/content.html'
	}
});

