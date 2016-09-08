// load dependencies
var mongoose = require('mongoose');

// define schema for show model
var showSchema = mongoose.Schema({

    name: String,
    date: {
        day: String,
        start: String,
        stop: String
    },
    hosts: [String]

});

// create the model and expose it to the app
module.exports = mongoose.model('Show', showSchema);
