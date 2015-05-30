//사용자관리
var router = require('express').Router();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var config = require('../../config');

var board =require('../../models/boards');
var User = board.User;
var Board = board.Board;
var Comment = board.Comment;

//관리자화면 : 사용자 리스트 얻기
router.post('/user/getList', function(req, res) {
	User.find()
	.sort('-created')
	.exec(function(err, posts) {
	if(err) {return next(err) }
		res.json(posts);
	});
});

//관리자화면 : 사용자 수정
router.post('/user/modify', function(req, res) {
	bcrypt.hash(req.body.password, null, null, function(err, hash){
		if(err) { return res.json(err)}
		console.log('hash:' + hash);
		User.update(
			{_id:req.body._id},
			{password:hash, name:req.body.name})
		.exec(function(err, data) {
			if(err) {return res.json(err)}
			var token = jwt.encode({_id: req.body._id}, config.secret);
			res.json(data);
		});
	})
});

//관리자화면 : 사용자 삭제
//관리자화면 : 사용자 삭제
router.post('/user/remove', function(req, res) {
	User.find({_id:req.body._id})
	.remove()
	.exec(function(err, user) {
		if(err) {return res.json(err) }
		res.json({result:0, msg:'success'});
	});
});

//신규 사용자 생성 
//input : _id, passowrd, name (password는 암호화)
//result: token
router.post('/user/add', function(req, res) {
	console.log(req.body._id);
	console.log(req.body.password);
	var user = new User({
		_id : req.body._id, 
		name: req.body.name
	});
	bcrypt.hash(req.body.password, null, null, function(err, hash){
		if(err) { return res.json(err)}
		console.log('hash:' + hash);
		user.password = hash;
		user.save(function(err, data){
			if(err) {return res.json(err)}
			var token = jwt.encode({_id: req.body._id}, config.secret);
			res.json(data);
		});
	})
});

//인증 (로컬 로그인)
//input: _id, password
//result : token
router.post('/user/localAuth', function(req, res, next) {
	console.log("password:" + req.body.password);
	User.findOne({_id: req.body._id})
	.select('password').select('_id')
	.exec(function(err, user){
		if(err) { return res.json(err)}
		if(!user) {return res.json({result: 100, msg: 'id do not exist'})}
		console.log(user.username + "," + user.password);
		bcrypt.compare(req.body.password, user.password, function(err, valid){
			console.log(err);
			if(err) { return res.json(err)}
			if(!valid) {return res.json({result:200, msg:'mismatch'})}
			var token = jwt.encode({_id: req.body._id}, config.secret);
			res.send({result: 0, token: token});
		})
	})
})

//인증 (페이스북 로그인)
//input: id, facebook_id, facebook_name
//result : token
router.post('/user/facebookAuth', function(req, res, next) {
	console.log("_id:" + req.body._id);
	User.findOne({_id: req.body._id})
	.exec(function(err, user){
		if(err) { return res.json(err)}
		if(!user) {
			var user = new User({
				_id : req.body._id, 
				facebook : {id: req.body.facebook_id,
					name: req.body.facebook_name}
			});

			user.save(function(err){
				if(err) {return res.json(err)}
				var token = jwt.encode({_id: req.body._id}, config.secret);
				res.json({result:0, token: token});
			});
		} else {
			user.facebook.id = req.body.facebook_id;
			user.facebook.name = req.body.facebook_name;
			user.save();
			var token = jwt.encode({_id: req.body._id}, config.secret);
			res.send({result: 0, token: token});
		}
	})
})

module.exports = router;

/*
{
	  "id" : "eastflag@gmail.com",
	  "name" : "eastflag",
	  "password" : "1234"
	}
*/