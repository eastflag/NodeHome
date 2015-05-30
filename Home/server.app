var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
var logger     = require('morgan');

app.use(logger('dev'));
app.use(require('./controller'));

app.listen(4000, function() {
    console.log('server listening on', 4000);
});