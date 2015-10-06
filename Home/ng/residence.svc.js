angular.module('app')
.service('ResidenceSvc', function($http) {
	this.getTraffic = function() {
		return $http.post('/api/lol/admin/getResicence/traffic');
	}
	this.getCommercial = function() {
		return $http.post('/api/lol/admin/getResicence/commercial');
	}
	this.getLeisure = function() {
		return $http.post('/api/lol/admin/getResicence/leisure');
	}
	this.getGreen = function() {
		return $http.post('/api/lol/admin/getResicence/green');
	}
	this.getArea = function() {
		return $http.post('/api/lol/admin/getResicence/area');
	}
});