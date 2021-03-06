angular.module('app')
.service('PointSvc', function($http) {
	this.getRankingList = function() {
		return $http.post('/api/lol/point/getRankingList');
	}

	this.getTravelList = function(user) {
		return $http.post('/api/lol/travel/getlist', user);
	}

	this.getLocationList = function(travel) {
		return $http.post('/api/lol/location/getlist', travel);
	}
});