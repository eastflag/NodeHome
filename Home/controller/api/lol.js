var Lol =require('../../models/lol');
var router = require('express').Router();

//������
var Survey = Lol.Survey;
var Travel = Lol.Travel;
var Location = Lol.Location;

router.post('/lol/survey/add', function(req, res) {
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

router.post('/lol/survey/get', function(req, res) {
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
router.post('/lol/travel/add', function(req, res) {
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

router.post('/lol/travel/update', function(req, res) {
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

	//update
	Travel.update({_id: req.body.id},
		update,
		{upsert: false})
	.exec(function(err, travel) {
		res.json({result:0, data: travel});
	});
});

router.post('/lol/travel/get', function(req, res) {
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

router.post('/lol/travel/getlist', function(req, res){
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

router.post('/lol/location/add', function(req, res) {
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

router.post('/lol/location/get', function(req, res) {
	console.log(req.body.travelId);
	
	Location.find({travelId: req.body.travelId}, function (err, success) {
		if(err) return res.json({result:100, data:err});
		res.json({result:0, data:success});
	});
});

router.post('/lol/location/getlist', function(req, res){
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

module.exports = router;