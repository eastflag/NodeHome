var router = require('express').Router();

var board =require('../../models/boards');
var User = board.User;
var Board = board.Board;
var Comment = board.Comment;



//댓글목록 가져오기
router.post('/comment/getList', function(req, res) {
	Comment.find()
	.sort('-created')
	//.populate('userId')
	.exec(function(err, posts) {
	if(err) {return next(err) }
		res.json(posts);
	});
});

//댓글쓰기
router.post('/comment/add', function(req, res) {
	console.log(req.body.content);
	var comment = new Comment(
		{content : req.body.content, 
		boardId: req.body.buardId,
		userId: req.body.userId});
	comment.save(function(err, data){
	if(err) { return next(err); }
	res.json(201, data);
	});
});

module.exports = router;

/*
{
	"content" : "comment1",
	"boardId" : "5536f2ebf3f7d26c1a7efeec",
	"userId" : "ttoggang2@gmail.com" 
}
*/