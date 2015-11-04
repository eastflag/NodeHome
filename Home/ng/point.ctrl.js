angular.module('app')
.controller('PointCtrl', function($scope, PointSvc){

	$scope.pointList = [];
	$scope.travelList = [];
	$scope.locationList = [];
	
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

	$scope.viewMap = function(travel) {
		console.log('travelId:' + travel);
		PointSvc.getLocationList({travelId:travel})
		.success(function(datas) {
			var locationList = datas.data;
			var origin = new google.maps.LatLng(locationList[0].lat, locationList[0].lng);
			var destination = new google.maps.LatLng(locationList[locationList.length-1].lat, locationList[locationList.length-1].lng);

			var mapOptions = {
		        zoom: 14,
		        center: destination,
		        mapTypeId: google.maps.MapTypeId.TERRAIN
		    }

		    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var origin_marker=new google.maps.Marker({
				position:origin
			});

			var destination_marker=new google.maps.Marker({
				position:destination,
				animation:google.maps.Animation.BOUNCE
			});

			origin_marker.setMap($scope.map);
			destination_marker.setMap($scope.map);

			//draw path
			var pathCoordinates = [];
			for(var i=0; i < locationList.length ; ++i) {
				pathCoordinates[i] = {lat:locationList[i].lat, lng:locationList[i].lng};
			}

			var pathLine = new google.maps.Polyline({
			    path: pathCoordinates,
			    geodesic: true,
			    strokeColor: '#FF0000',
			    strokeOpacity: 1.0,
			    strokeWeight: 3
			});

			pathLine.setMap($scope.map);

		})
	}



})