'use strict';


/*var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
				content = document.getElementById('content');

 $(".menu-toggle").click(function(e) {
        e.preventDefault();
        $('#content').toggleClass('cbp-spmenu-push-toright' );
        $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open');
        classie.toggle( content, 'cbp-spmenu-push-toright' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
 });*/

	

var app = angular.module('myApp.home', ['ngRoute'])


app.controller('homeCtrl', ['$scope','$location','Data',function ($scope,$location,Data) {

	$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
}]);

/* Directives */

app.directive('homeSidebar',function(){
	return{
		templateUrl: 'partials/home/sidebar.html'
	}
});

app.directive('homeNavbar',function(){
	return{
		templateUrl: 'partials/home/navbar.html'
	}
});