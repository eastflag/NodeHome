angular.module('app')
.controller('ResidenceCtrl', function($scope, ResidenceSvc){
	
	$scope.getTraffic = function() {
		ResidenceSvc.getTraffic()
		.success(function(datas) {
			var residence_data = datas.data;
			//console.log('residence_data data:' + sex_data[0]._id.sex);

			var data = [{period: '아주불만족',value: 0},
				{period: '불만족',value: 0},
				{period: '보통',value: 0},
				{period: '만족',value: 0},
				{period: '매우만족',value: 0}];

			for(var i=0; i < residence_data.length; ++i) {
				if(residence_data[i]._id.value == "1") {
					data[0].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "2") {
					data[1].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "3") {
					data[2].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "4") {
					data[3].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "5") {
					data[4].value = residence_data[i].count;
	            }
			}

	        Morris.Bar({
	            element: 'morris-traffic-chart',
	            data: data,
	            xkey: 'period',
	            ykeys: ['value'],
	            labels: ['대중교통 만족도'],
	            pointSize: 2,
	            hideHover: 'auto',
	            resize: true
	        });
		})
	}

	$scope.getCommercial = function() {
		ResidenceSvc.getCommercial()
		.success(function(datas) {
			var residence_data = datas.data;
			//console.log('residence_data data:' + sex_data[0]._id.sex);

			var data = [{period: '아주불만족',value: 0},
				{period: '불만족',value: 0},
				{period: '보통',value: 0},
				{period: '만족',value: 0},
				{period: '매우만족',value: 0}];

			for(var i=0; i < residence_data.length; ++i) {
				if(residence_data[i]._id.value == "1") {
					data[0].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "2") {
					data[1].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "3") {
					data[2].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "4") {
					data[3].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "5") {
					data[4].value = residence_data[i].count;
	            }
			}

	        Morris.Bar({
	            element: 'morris-commercial-chart',
	            data: data,
	            xkey: 'period',
	            ykeys: ['value'],
	            labels: ['대중교통 만족도'],
	            pointSize: 2,
	            hideHover: 'auto',
	            resize: true
	        });
		})
	}

	$scope.getLeisure = function() {
		ResidenceSvc.getLeisure()
		.success(function(datas) {
			var residence_data = datas.data;
			//console.log('residence_data data:' + sex_data[0]._id.sex);

			var data = [{period: '아주불만족',value: 0},
				{period: '불만족',value: 0},
				{period: '보통',value: 0},
				{period: '만족',value: 0},
				{period: '매우만족',value: 0}];

			for(var i=0; i < residence_data.length; ++i) {
				if(residence_data[i]._id.value == "1") {
					data[0].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "2") {
					data[1].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "3") {
					data[2].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "4") {
					data[3].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "5") {
					data[4].value = residence_data[i].count;
	            }
			}

	        Morris.Bar({
	            element: 'morris-leisure-chart',
	            data: data,
	            xkey: 'period',
	            ykeys: ['value'],
	            labels: ['대중교통 만족도'],
	            pointSize: 2,
	            hideHover: 'auto',
	            resize: true
	        });
		})
	}

	$scope.getGreen = function() {
		ResidenceSvc.getGreen()
		.success(function(datas) {
			var residence_data = datas.data;
			//console.log('residence_data data:' + sex_data[0]._id.sex);

			var data = [{period: '아주불만족',value: 0},
				{period: '불만족',value: 0},
				{period: '보통',value: 0},
				{period: '만족',value: 0},
				{period: '매우만족',value: 0}];

			for(var i=0; i < residence_data.length; ++i) {
				if(residence_data[i]._id.value == "1") {
					data[0].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "2") {
					data[1].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "3") {
					data[2].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "4") {
					data[3].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "5") {
					data[4].value = residence_data[i].count;
	            }
			}

	        Morris.Bar({
	            element: 'morris-green-chart',
	            data: data,
	            xkey: 'period',
	            ykeys: ['value'],
	            labels: ['녹지 만족도'],
	            pointSize: 2,
	            hideHover: 'auto',
	            resize: true
	        });
		})
	}

	$scope.getArea= function() {
		ResidenceSvc.getArea()
		.success(function(datas) {
			var residence_data = datas.data;
			//console.log('residence_data data:' + sex_data[0]._id.sex);

			var data = [{period: '49.5m2이하',value: 0},
				{period: '49.58~59.4m2',value: 0},
				{period: '59.5~79.32m2',value: 0},
				{period: '79.33~105.78m2',value: 0},
				{period: '105.79m2~',value: 0}];

			for(var i=0; i < residence_data.length; ++i) {
				if(residence_data[i]._id.value == "1") {
					data[0].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "2") {
					data[1].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "3") {
					data[2].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "4") {
					data[3].value = residence_data[i].count;
	            } else if (residence_data[i]._id.value == "5") {
					data[4].value = residence_data[i].count;
	            }
			}

	        Morris.Bar({
	            element: 'morris-area-chart',
	            data: data,
	            xkey: 'period',
	            ykeys: ['value'],
	            labels: ['거주면적'],
	            pointSize: 2,
	            hideHover: 'auto',
	            resize: true
	        });
		})
	}

	$scope.getTraffic();
	$scope.getCommercial();
	$scope.getLeisure();
	$scope.getGreen();
	$scope.getArea();
})