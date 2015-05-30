var Post =require('../../models/posts');
var router = require('express').Router();

router.get('/', function(req, res) {
	Post.find()
	.sort('-date')
	.exec(function(err, posts) {
	if(err) {return next(err) }
	res.json(posts);
	});
});

router.post('/', function(req, res) {
	console.log(req.body.username);
	console.log(req.body.body);
	var post = new Post(
	{username : req.body.username, body: req.body.body});
	post.save(function(err, data){
	if(err) { return next(err); }
	res.json(201, data);
	});
});

module.exports = router;
