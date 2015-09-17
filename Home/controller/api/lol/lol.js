var Lol =require('../../../models/lol');
var Board =require('../../../models/boards');
var router = require('express').Router();

//모델 정의
var User = Board.User;
var Survey = Lol.Survey;
var Travel = Lol.Travel;
var Location = Lol.Location;

//카카오톡 oauth 인증
router.get('/kakao/oauth', function(req, res) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	console.log('url:' + req.url); // /kakao/oauth?code=xxx
	var query = url_parts.query;
	console.log('query:' + query);
	var code = query.code;
	console.log('code:' + code);
	res.json({code: code});
});

//LoLTravel 신규 사용자 등록
router.post('/user/add', function(req, res) {
	console.log('/api/lol/user/add:' + req.body.id);
	var user = {
		name: req.body.name,
		locale: req.body.locale
	};
	
	//insert or update
	User.update({_id: req.body.id},
		user,
		{upsert: true})
	.exec(function(err, data){
		res.json({result:0, msg: 'success'});
	});
});

router.post('/survey/add', function(req, res) {
	console.log(req.body.id);

	var update = {
		socioeconomic : {
			sex: req.body.socioeconomic.sex,
			age: req.body.socioeconomic.age,
			income: req.body.socioeconomic.income,
			address: req.body.socioeconomic.address,
			drive_license: req.body.socioeconomic.drive_license
		},
		residential : {
			public_transport: req.body.residential.public_transport,
			commercial_facility: req.body.residential.commercial_facility,
			leisure_facility: req.body.residential.leisure_facility,
			green_space: req.body.residential.green_space,
			floor_space: req.body.residential.floor_space 
		}
	};

	//insert or update
	Survey.update({userId: req.body.id},
		update,
		{upsert: true})
	.exec(function(err, data){
		res.json({result:0, msg: 'success'});
	});
});

router.post('/survey/get', function(req, res) {
	Survey.findOne({userId: req.body.id})
	.exec(function(err, survey) {
		if(err) {return res.json({result:500, data: err})}
		if(survey) {
			res.json({result:0, data: survey});
		} else {
			res.json({result:100, msg:'data do not exist'});
		}
	});
});

//first insert
router.post('/travel/add', function(req, res) {
	console.log(req.body.id);

	//insert
	Travel.create({
		userId: req.body.id,
		travelInfo: {
			flight: req.body.travelInfo.flight,
			mode: req.body.travelInfo.mode,
			purpose: req.body.travelInfo.purpose
		}
	}, function(err, travel) {
		res.json({result:0, data: travel});
	});
});

router.post('/travel/update', function(req, res) {
	console.log(req.body.id);

	var update = {};
	if(req.body.travelInfo) {
		update.travelInfo = {
			flight: req.body.travelInfo.flight,
			mode: req.body.travelInfo.mode,
			purpose: req.body.travelInfo.purpose
		}
	}
	if(req.body.origin) {
		update.origin = {
			lat: req.body.origin.lat,
			lng: req.body.origin.lng,
			address: req.body.origin.address
		}
	}
	if(req.body.destination) {
		update.destination = {
			lat: req.body.destination.lat,
			lng: req.body.destination.lng,
			address: req.body.destination.address
		}
	}
	
	//출발지 입력 혹은 목적지 입력시에 위치 저장하기
	if (req.body.origin || req.body.destination) {
		var location = new Location({
			travelId: req.body.id,
			lat:  req.body.origin.lat,
			lng: req.body.origin.lng,
			address: req.body.origin.address
		})

		location.save(function(err) {
			
		});
	}

	//update
	Travel.update({_id: req.body.id},
		update,
		{upsert: false})
	.exec(function(err, travel) {
		res.json({result:0, data: travel});
	});
});

router.post('/travel/get', function(req, res) {
	console.log(req.body.travelId);

	Travel.findOne({_id: req.body.travelId})
	.exec(function(err, travel) {
		if(err) {return res.json({result:500, data: err})}
		if(travel) {
			res.json({result:0, data: travel});
		} else {
			res.json({result:100, msg:'data do not exist'});
		}
	});
});

router.post('/travel/getlist', function(req, res){
	console.log(req.body.userId);
	
	Travel.find({userId:req.body.userId})
	.exec(function(err, travelList){
		if(err) {return res.json({result:500, data: err})}
		if(travelList) {
			res.json({result:0, data: travelList});
		} else {
			res.json({result:100, msg:'data do not exist'});
		}
	})
})

router.post('/location/add', function(req, res) {
	console.log(req.body.travelId);

	var location = new Location({
		travelId: req.body.travelId,
		lat: req.body.lat,
		lng: req.body.lng,
		address: req.body.address
	})

	location.save(function(err) {
		if(err) res.json({result:100, data:err});
		res.json({result:0});
	});
});

router.post('/location/get', function(req, res) {
	console.log(req.body.travelId);
	
	Location.find({travelId: req.body.travelId}, function (err, success) {
		if(err) return res.json({result:100, data:err});
		res.json({result:0, data:success});
	});
});

router.post('/location/getlist', function(req, res){
	console.log(req.body.travelId);
	
	Location.find({travelId:req.body.travelId})
	.exec(function(err, locationList){
		if(err) {return res.json({result:500, data: err})}
		if(locationList) {
			res.json({result:0, data: locationList});
		} else {
			res.json({result:100, msg:'data do not exist'});
		}
	})
})

router.post('/point/getMyPoint', function(req, res){
	Travel.find(
	    {userId:req.body.userId}
	)
	.count(function (err, count) {
		if (err) return res.json({result:100, msg:err});
		res.json({result:0, data: {count:count}});
	});
})

router.post('/point/getRankingList', function(req, res){
	Travel.aggregate(
  	    { $group: { _id: '$userId', count: { $sum: 1}}}, 
  	    { $sort: {"count": -1}},
  		function (err, data) {
  		   	if (err) return res.json({result:100, msg:err});
  		    User.populate( data, { "path": "_id" }, function(err,datas) {
  		    	res.json({result:0, data:datas});
  		    });
  	    }
  	);
})

module.exports = router;
