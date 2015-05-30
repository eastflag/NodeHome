//모델정의
var board =require('../../models/boards');
var User = board.User;
var Board = board.Board;
var Comment = board.Comment;
var NoBoard = board.NoBoard;

var router = require('express').Router();

router.post('/get', function(req, res) {
	NoBoard.find()
	.sort('-created')
	//.populate('userId')
	.exec(function(err, data) {
		if(err) { 
			res.json({'result':500, 'msg':err}); 
		} else {
			res.json({'result':0, 'msg':'success', 'value': data});
		}
	});
});

router.post('/add', function(req, res) {
	console.log(req.body.title);

	var noboard = new NoBoard({
		title : req.body.title, 
		content: req.body.content,
		nickname: req.body.nickname,
		password: req.body.nickname
	});
	
	noboard.save(function(err, data){
		if(err) { 
			res.json({'result':500, 'msg':err}); 
		} else {
			res.json({'result':0, 'msg':'success'});
		}
	});
});

module.exports = router;

//test
/*
{
	  "title" : "title1",
	  "content" : "content1",
	  "nickname" : "eastflag",
	  "password" : "1234"
	}

*/