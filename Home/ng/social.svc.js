angular.module('app')
.service('SocialSvc', function($http) {
	this.getSex = function() {
		return $http.post('/api/lol/admin/getSocial/sex');
	}
	this.getDrive = function() {
		return $http.post('/api/lol/admin/getSocial/drive');
	}
	this.getAge = function() {
		return $http.post('/api/lol/admin/getSocial/age');
	}
	this.getIncome = function() {
		return $http.post('/api/lol/admin/getSocial/income');
	}
});