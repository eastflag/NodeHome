angular.module('app')
.service('UserSvc', function($http) {
	this.fetch = function() {
		return $http.post('/api/user/getList');
	}
	this.create = function(user) {
		return $http.post('/api/user/add', user);
	}
	this.modify = function(user) {
		return $http.post('/api/user/modify', user);
	}
	this.remove = function(user) {
		return $http.post('/api/user/remove', user);
	}
});