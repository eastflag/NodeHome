angular.module('app')
.controller('SocialCtrl', function($scope, SocialSvc){
	
	$scope.getSex = function() {
		SocialSvc.getSex()
		.success(function(datas) {
			var sex_data = datas.data;
			console.log('sex data:' + sex_data[0]._id.sex);

			var data = [];
			for(var i=0; i < sex_data.length; ++i) {
				if(sex_data[i]._id.sex == 1) {
					var male_data = { label: "여자", data: sex_data[i].count };
					data.push(male_data);
	            } else {
					var female_data = { label: "남자", data: sex_data[i].count };
					data.push(female_data);
	            }
			}

	        var plotObj = $.plot($("#flot-pie-chart-sex"), data, {
	            series: {
	                pie: {
	                    show: true
	                }
	            },
	            grid: {
	                hoverable: true
	            },
	            tooltip: true,
	            tooltipOpts: {
	                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
	                shifts: {
	                    x: 20,
	                    y: 0
	                },
	                defaultTheme: false
	            }
	        });
		})
	}

	$scope.getDrive = function() {
		SocialSvc.getDrive()
		.success(function(datas) {
			var drive_data = datas.data;
			console.log('drive data:' + drive_data[0]._id.drive_license);

			var data = [{ label: "운전면허 소지", data: 0 }, { label: "운전면허 미소지", data: 0 }];
			for(var i=0; i < drive_data.length; ++i) {
				if(drive_data[i]._id.drive_license == 1) {
					data[0].data = drive_data[i].count;
	            } else {
					data[1].data = drive_data[i].count;
	            }
			}

	        var plotObj = $.plot($("#flot-pie-chart-drive"), data, {
	            series: {
	                pie: {
	                    show: true
	                }
	            },
	            grid: {
	                hoverable: true
	            },
	            tooltip: true,
	            tooltipOpts: {
	                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
	                shifts: {
	                    x: 20,
	                    y: 0
	                },
	                defaultTheme: false
	            }
	        });
		})
	}

	$scope.getAge = function() {
		SocialSvc.getAge()
		.success(function(datas) {
			var age_data = datas.data;

			var data = [{period: '0-19',age: 0},
				{period: '20-29',age: 0},
				{period: '30-39',age: 0},
				{period: '40-49',age: 0},
				{period: '50-59',age: 0},
				{period: '60-',age: 0}];

			for(var i=0; i < age_data.length; ++i) {
				if(age_data[i]._id == "range 0-19") {
					data[0].age = age_data[i].count;
	            } else if (age_data[i]._id == "range 20-29") {
					data[1].age = age_data[i].count;
	            } else if (age_data[i]._id == "range 30-39") {
					data[2].age = age_data[i].count;
	            } else if (age_data[i]._id == "range 40-49") {
					data[3].age = age_data[i].count;
	            } else if (age_data[i]._id == "range 50-59") {
					data[4].age = age_data[i].count;
	            } else {
	            	data[5].age = age_data[i].count;
	            }
			}

	        Morris.Bar({
	            element: 'morris-age-chart',
	            data: data,
	            xkey: 'period',
	            ykeys: ['age'],
	            labels: ['연령대'],
	            pointSize: 2,
	            hideHover: 'auto',
	            resize: true
	        });
		})
	}

	$scope.getIncome = function() {
		SocialSvc.getIncome()
		.success(function(datas) {
			var income_data = datas.data;

			var data = [{period: '~2천만',income: 0},
				{period: '2천~4천만',income: 0},
				{period: '4천-6천만',income: 0},
				{period: '6천-8천만',income: 0},
				{period: '8천-1억',income: 0},
				{period: '1억이상',income: 0}];

			for(var i=0; i < income_data.length; ++i) {
				if(income_data[i]._id == "range 0-20") {
					data[0].income = income_data[i].count;
	            } else if (income_data[i]._id == "range 20-40") {
					data[1].income = income_data[i].count;
	            } else if (income_data[i]._id == "range 40-60") {
					data[2].income = income_data[i].count;
	            } else if (income_data[i]._id == "range 60-80") {
					data[3].income = income_data[i].count;
	            } else if (income_data[i]._id == "range 80-100") {
					data[4].income = income_data[i].count;
	            } else {
	            	data[5].income = income_data[i].count;
	            }
			}

	        Morris.Bar({
	            element: 'morris-income-chart',
	            data: data,
	            xkey: 'period',
	            ykeys: ['income'],
	            labels: ['수입'],
	            pointSize: 2,
	            hideHover: 'auto',
	            resize: true
	        });
		})
	}

	$scope.getSex();
	$scope.getDrive();
	$scope.getAge();
	$scope.getIncome() ;
})