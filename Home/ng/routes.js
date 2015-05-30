angular.module('app')
.config( ['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {controller: 'UserCtrl', templateUrl: '/templates/user.html'})
	.when('/user', {controller: 'UserCtrl', templateUrl: '/templates/user.html'})
	
	$locationProvider.html5Mode(true);
}]);