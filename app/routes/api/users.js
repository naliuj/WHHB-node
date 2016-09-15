// middleware to make sure that the user is at least an admin
var isAdmin = require('../middleware/isAdmin');

// Show model
var User = require('../../models/user');

module.exports = function(app, passport) {

    // GET /api/users
    app.get('/api/users', isAdmin, function(req, res) {

        // find all the users
        User.find({}, function(err, data) {
            // return the JSON data
            res.json(data);
        });

    });

}
