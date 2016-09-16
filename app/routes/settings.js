// middleware to make sure that the user is logged in
var isLoggedIn = require('./middleware/isLoggedIn');

// User model
var User = require('../models/user');

// expose the module to the app
module.exports = function(app, passport) {

    // GET /settings
    app.get('/settings', isLoggedIn, function(req, res) {
        // render the settings.ejs template
        res.render('settings.ejs', {
            req: req,
            page: 'settings',
            message: req.flash('passwordMessage')
        });
    });

    // POST /settings
    app.post('/settings', isLoggedIn, function(req, res) {
        // find the user by their ID
        User.findById(req.user._id, function(err, u) {
            // if there's an error, throw it
            if (err)
                throw err;
            // check to make sure that the old password is valid
            if (u.validPassword(req.body.oldPass)) {
                u.local.password = u.generateHash(req.body.newPass);
                u.save(function(err) {
                    if (err) {
                        // if there's an error, return JSON with an error
                        res.json({ status: 'err' });
                    } else {
                        // if all went well, return the JSON with done
                        res.json({ status: 'done' });
                    }
                });

            };

        });

    });

}
