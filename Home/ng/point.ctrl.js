angular.module('app')
.controller('PointCtrl', function($scope, PointSvc){

	$scope.pointList = [];
	$scope.travelList = [];
	
	$scope.getRankingList = function() {
		PointSvc.getRankingList()
		.success(function(datas) {
			$scope.pointList = datas.data;

		})
	}

	$scope.getRankingList();

	$scope.viewTravel = function(email) {
		console.log('viewTravel');
		PointSvc.getTravelList({userId:email})
		.success(function(datas) {
			$scope.travelList = datas.data;
		})
	}
})