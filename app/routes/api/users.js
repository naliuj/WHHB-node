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
