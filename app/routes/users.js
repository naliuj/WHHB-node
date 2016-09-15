// middleware to verify that the user has a role of at least admin
var isAdmin = require("./middleware/isAdmin");

module.exports = function(app, passport) {

    // GET users
    app.get('/users', isAdmin, function(req, res) {
        res.render('users.ejs', {
            req: req,
            page: 'users',
            message: req.flash('signupMessage')
        });
    });

    // POST users
    app.post('/users', isAdmin, passport.authenticate('local-signup', {
        successRedirect: '/users',
        failureRedirect: '/users',
        failureFlash: true
    }));

}
