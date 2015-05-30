var board =require('../../models/boards');
var User = board.User;
var Board = board.Board;
var Comment = board.Comment;

var router = require('express').Router();

//게시판 글목록 얻어오기
router.post('/board/getList', function(req, res) {
	Board.find()
	.sort('-created')
	//.populate('userId')
	.exec(function(err, posts) {
	if(err) {return next(err) }
		res.json(posts);
	});
});

//게시판 글쓰기
router.post('/board/add', function(req, res) {
	console.log(req.body.title);
	console.log(req.body.id);
	var board = new Board(
		{title : req.body.title, content: req.body.content,
		userId: req.body.id});
	board.save(function(err, data){
	if(err) { return next(err); }
	res.json(201, data);
	});
});

module.exports = router;

/*
{
	"title" : "title1",
	"id" : "eastflag@gmail.com",
	"content" : "content1"
}
*/
