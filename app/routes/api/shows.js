// is logged in middleware
var isLoggedIn = require('../middleware/isLoggedIn');

// Show module
var Show = require('../../models/show.js');

module.exports = function(app, passport) {

    // =========================================================================
    // GET api/shows ===========================================================
    // =========================================================================
    app.get('/api/shows', isLoggedIn, function(req, res) {
        // show model
        Show
        // find posts from Show
        .find()
        // sort Show posts by day of the week and start time
        .sort({'date.day': 'ascending', 'date.start': 'ascending'})
        // execute this function once all the shows are found and sorted
        .exec(function(err, shows) {
            // if there's an error, log it and flash a message
            if (err)
                console.error(err);
            // render show JSON data
            res.json(shows);
        });
    });

    // =========================================================================
    // POST /api/shows =========================================================
    // =========================================================================
    app.post('/api/shows', isLoggedIn, function(req, res) {
        // assign the show id to a variable
        var $id = req.body.id;
        // find a show with the id and remove it
        Show.remove({ '_id' : $id }, function(err) {
            // if there's an error, log it to the console
            if (err)
                console.error(err);
        });
    });



}
