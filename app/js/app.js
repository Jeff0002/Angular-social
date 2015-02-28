'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute','myApp.login','myApp.home','myApp.version']);

/* Factories */

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

app.factory('sessionService', ['$http', function($http){
    return{
        set:function(key,value){
            return sessionStorage.setItem(key,value);
        },
        get:function(key){
            return sessionStorage.getItem(key);
        },
        destroy:function(key){
            $http.post('data/destroy_session.php');
            return sessionStorage.removeItem(key);
        }
    };
}]);

app.factory('loginService',function($http, $location, sessionService){
    return{
        login:function(data,scope){
            var $promise=$http.post('data/login.php',data); //send data to user.php

            $promise.then(function(msg){
                var uid = msg.data;
                console.log(uid);
                if(uid){
                    scope.msgtxt='Correct information';
                    console.log(scope.msgtxt);
                    sessionService.set('uid',uid);
                    $location.path('/home');
                }          
                else  {
                    scope.msgtxt='incorrect information';
                    console.log(scope.msgtxt);
                    $location.path('/login');
                }                  
            });
        },
        logout:function(){
            sessionService.destroy('uid');
            $location.path('/login');
        },
        islogged:function(){
            var $checkSessionServer=$http.post('data/check_session.php');
            return $checkSessionServer;
            /*
            if(sessionService.get('user')) return true;
            else return false;
            */
        }
    }

});

app.factory('signupService',function($http, $location, sessionService){
    return{
        signup:function(data,scope){
            var $promise=$http.post('data/adduser.php',data); //send data to adduser.php
        }
    }

});

app.run(function($rootScope, $location, loginService){
    var routespermission=['/home'];  //route that require login
    $rootScope.$on('$routeChangeStart', function(){
        if( routespermission.indexOf($location.path()) !=-1)
        {
            var connected=loginService.islogged();
            connected.then(function(msg){
                if(!msg.data) $location.path('/login');
            });
        }
    });
});

app.run(function($rootScope, $location, loginService){
    var routelogged=['/login'];  //route that require login
    $rootScope.$on('$routeChangeStart', function(){
        if( routelogged.indexOf($location.path()) !=-1)
        {
            var connected=loginService.islogged();
            connected.then(function(msg){
                if(msg.data) $location.path('/home');
            });
        }
    });
});