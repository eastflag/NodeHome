//var db = require('../homeDB');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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

exports.Survey = mongoose.model('survey', surveySchema);

//new trip
var travelSchema = new Schema({
	userId: {
		type: String,
		ref: 'user'
	},
	created: {type: Date, default: Date.now},
	updated: {type: Date}, //last date, when destination is updated
	distance: Number, //total distance
	point: Number, //20km 차등된 점수
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
exports.Travel = mongoose.model('travel', travelSchema);

//new trip GPS
var locationSchema = new Schema({
	travelId: {
		type: Number,
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
exports.Location = mongoose.model('location', locationSchema);