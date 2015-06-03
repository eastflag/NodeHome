var db = require('../homeDB');
var Schema = db.Schema;

var surveySchema = new Schema({
	userId: {
		type: String,
		ref: 'user'
	},
	socioeconomic: {
		sex: Number,
		age: String,
		income: String,
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

exports.Location = db.model('location', locationSchema);