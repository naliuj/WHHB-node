// is logged in middleware
var isLoggedIn = require('../middleware/isLoggedIn');

// show model
var Show = require('../../models/show');

// expose the routes to the app
module.exports = function(app, passport) {

    // POST /api/delShow
    app.post('/api/delShow', isLoggedIn, function(req, res) {
        // assign the show id to a variable
        var $id = req.body.id;
        // find a show with the id and remove it
        Show.remove({ '_id' : $id }, function(err) {
            // if there's an error, log it to the console
            if (err)
                console.error(err);
        });
    });

};
