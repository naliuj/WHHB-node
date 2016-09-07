var isLoggedIn = require('./middleware/isLoggedIn');
var notLoggedIn = require('./middleware/notLoggedIn');
module.exports = function(app, passport) {

    // GET login page
    app.get('/login', notLoggedIn, function(req, res) {
        // render login.ejs and pass in any flash data
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // POST login page
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // GET logout page
    app.get('/logout', isLoggedIn, function(req, res) {
        req.logout();
        res.redirect('/login');
    });

};
