// middleware to make sure that the user is at least an admin
var isAdmin = require('../middleware/isAdmin');

// Show model
var User = require('../../models/user');

module.exports = function(app, passport) {

    // GET /api/users
    app.get('/api/users', isAdmin, function(req, res) {
        User
        // find users from User
        .find()
        // sort users by role and alphabetically
        .sort({'local.role': 'descending', 'local.username': 'ascending'})
        // execute function once all shows are found and sorted
        .exec(function(err, shows) {
            // if there's an error, log it
            if (err)
                console.error(err);
            // render user JSON datar
            res.json(shows);
        });
    });

    // POST /api/users
    app.post('/api/users', isAdmin, function(req, res) {
        // assign the user's ID to a variable
        var $id = req.body.id;
        // find the user by ID
        User.remove({ '_id': $id }, function(err) {
            // if there's an error, lot it to the console
            if (err)
                console.error(err);
        });

    });

}
