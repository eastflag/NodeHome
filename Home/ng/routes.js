angular.module('app')
.config( ['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {templateUrl: 'templates/admin.html'})
	.when('/social', {templateUrl: 'templates/social.html'})
	.when('/residence', {templateUrl: 'templates/residence.html'})
	.when('/point', {templateUrl: 'templates/point.html'})
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
}]);