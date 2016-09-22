var config = require('../config/twitter');
var Twitter = require('twitter');

// authenticate the app with twitter
var client = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
});

// expose the client variable to the app
module.exports = client;
