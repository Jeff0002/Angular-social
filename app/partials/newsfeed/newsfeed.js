var values = [{
		title: "Midhun Darvin",
		img_thumb: "img/profile_default_thumb.jpg",
		date:02101993,
		subheading:"subheading1",
		subtitle:"the subtitle of first post",
		content:"the body content of the post",
		comments:[{
			name:"Midhun",
			email:"midhunadarvin@gmail.com",
			body:"This post is so awesome!!!"
		},{
			name:"Midhun",
			email:"midhunadarvin@gmail.com",
			body:"TLorem ipsum dolor sior. Duis placerat tellus at erat pellentesque nec ultricies erat molestie. Integer nec orci id tortor molestie porta. Suspendisse eu sagittis quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur quam a sapien egestas eget scelerisque lectus tempor. Duis placerat tellus at erat pellentesque nec ultricies erat molestie. Integer nec orci id tortor molestie porta. Suspendisse eu sagittis quam."
		},{
			name:"Midhun",
			email:"midhunadarvin@gmail.com",
			body:"I'm so AWESOME!!!"
		}]
	},{
		title: "The second post",
		img_thumb: "img/profile_default_thumb.jpg",
		date:2,
		subheading:"subheading2",
		subtitle:"the subtitle of second post",
		content:"the body content of the post",
		comments:[{
			name:"Midhun",
			email:"md@gmail.com",
			body:"Second post comment"
		}]

	},{
		title: "The Test post",
		img_thumb: "img/profile_default_thumb.jpg",
		date:3,
		subheading:"testing",
		subtitle:"the subtitle of test post",
		content:"lahblahb ahblah blahbl ahblahbl bahlablai should be ready by skdfj skdfsldfkjslkfjsl dksjlfdkj dkfjslkfready ",
		comments:[{
			name:"Midhun",
			email:"md@gmail.com",
			body:"Third post comment"
		}]
	}];

var newsfeed = angular.module('myApp.newsfeed',['ngRoute', 'ngAnimate']);

newsfeed.controller('newsCtrl', ['$scope','$rootScope',function ($scope,$rootScope)  {
			$scope.posts = values;
      		
}]);


	


