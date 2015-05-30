var jwt = require('jwt-simple');
var config = require('./config');

module.exports = function (req, res, next) {
	if (req.headers['x-auth']) {
		//req.auth = jwt.decode(req.headers['x-auth'], config.secret);
		res.auth = jwt.decode(req.headers['x-auth'], config.secret);
		console.log('auth is' + res.auth);
	}
	next();
}