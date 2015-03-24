'use strict';

var app = angular.module('myApp.login', ['ngRoute','ngAnimate','ngMessages']);

/* Controllers and directives */

app.controller('loginCtrl', ['$scope', '$location','Data', '$rootScope',function ($scope,$location,Data,$rootScope,$window){
		$scope.msgtxt='';
		/*$scope.login=function(data){
			loginService.login(data,$scope); //call login service
		};*/

        $scope.login = function (customer) {
            Data.post('login', {
                customer: customer
            }).then(function (results) {
                Data.toast(results);
                
                if (results.status == "success") {
                    $rootScope.name = results.name;
                    $location.path('/home');
                    }
                });
        };

          function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
              // Logged into your app and Facebook.
              testAPI();
            } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
            } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
            }
          }

          // This function is called when someone finishes with the Login
          // Button.  See the onlogin handler attached to it in the sample
          // code below.
          function checkLoginState() {
            FB.getLoginStatus(function(response) {
              statusChangeCallback(response);
            });
          }

        window.fbAsyncInit = function() {
            FB.init({
              appId      : '401788873326306',
              xfbml      : true,
              version    : 'v2.2'
            });

            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        };

         function testAPI() {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                  console.log('Successful login for: ' + response.name);
                  document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
                });
        }

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

      
}])

.controller('signupCtrl', ['$scope', '$location', 'Data', '$rootScope',function ($scope,$location,Data,$rootScope)   {

		var ctrl = this;
		ctrl.showEmailPrompt = false;
        ctrl.showUsernamePrompt = false;
        $scope.msgtxt='';

    $scope.signup = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/home');
            }
        });
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

