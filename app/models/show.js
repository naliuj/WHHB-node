// load dependencies
var mongoose = require('mongoose');

// define schema for show model
var showModel = mongoose.Schema({

    name: String,
    date: {
        day: String,
        start: String,
        stop: String
    },
    hosts: [String]

});

// create the module and expose it to the app
module.exports = mongoose.Model('Show', showSchema);
