var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/home', function() {
    console.log('mongodb connected');
});
module.exports = mongoose;