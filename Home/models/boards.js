var db = require('../homeDB');
var Schema = db.Schema;

var userSchema = new Schema({
	_id : {type: String, required: true}, //e-mail이 primary키
	name: String,
	password: String,
	locale: String,

	facebook: {
		id: String,
		name: String
	},
	created: {type: Date, default: Date.now}
}, {collection: 'user'})
exports.User = db.model('user', userSchema);

var boardSchema = new Schema({ 
	title: String,
	content: String,
	userId: {
		type: String,
		ref: 'user'
	},
	created: {
		type: Date, default: Date.now
	},
	updated: {
		type: Date, default: Date.now
	}
}, {collection: 'board'});
exports.Board = db.model('board', boardSchema);

var commentSchema = new Schema({
	content: String,
	boardId: {
		type: Schema.ObjectId,
		ref: 'board'
	},
	userId: {
		type: String,
		ref: 'user'
	},
	created: {
		type: Date, default: Date.now
	},
	updated: {
		type: Date, default: Date.now
	}
}, {collection: 'comment'});
exports.Comment = db.model('comment', commentSchema);

//익명게시판
var noboardSchema = new Schema({ 
	title: String,
	content: String,
	nickname: { type: String, required: true},
	password: { type: String, required: true},
	created: {
		type: Date, default: Date.now
	},
	updated: {
		type: Date, default: Date.now
	}
}, {collection: 'noboard'});
exports.NoBoard = db.model('noboard', noboardSchema);