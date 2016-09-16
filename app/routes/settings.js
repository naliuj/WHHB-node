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
    app.post('/settings', isLoggedIn, function(req, res) {})

}
