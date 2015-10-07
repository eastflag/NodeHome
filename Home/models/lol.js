//var db = require('../homeDB');
var mongoose = require('mongoose');
var Schema = db.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://www.javabrain.kr/home');

autoIncrement.initialize(connection);

var surveySchema = new Schema({
	userId: {
		type: String,
		ref: 'user'
	},
	socioeconomic: {
		sex: Number,
		age: Number,
		income: Number,
		address: String,
		drive_license: Number
	},
	residential: {
		public_transport: Number,
		commercial_facility: Number,
		leisure_facility: Number,
		green_space: Number,
		floor_space: Number
	},
	created: {type: Date, default: Date.now}
}, {collection: 'survey'})

exports.Survey = db.model('survey', surveySchema);

//new trip
var travelSchema = new Schema({
	userId: {
		type: String,
		ref: 'user'
	},
	created: {type: Date, default: Date.now},
	updated: {type: Date}, //last date, when destination is updated
	distance: Number, //total distance
	travelInfo: {
		flight: Number, //1:yes, 2: no
		mode: Number,
		purpose: Number
	},
	origin: {
		lat: Number,
		lng: Number,
		address: String
	}, 
	destination: {
		lat: Number,
		lng: Number,
		address: String
	}
}, {collection: 'travel'});
travelSchema.plugin(autoIncrement.plugin, {
    model: 'travel',
    startAt: 1
});
exports.Travel = db.model('travel', travelSchema);

//new trip GPS
var locationSchema = new Schema({
	travelId: {
		type: Schema.ObjectId,
		ref: 'travel'
	},
	created: {type: Date, default: Date.now},
	lat: Number,
	lng: Number,
	address: String
}, {collection: 'location'});
locationSchema.plugin(autoIncrement.plugin, {
    model: 'location',
    startAt: 1
});
exports.Location = db.model('location', locationSchema);