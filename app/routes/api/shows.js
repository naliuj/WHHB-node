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
            // render shows.ejs and pass req, page
            res.json(shows);
        });
    });


}
