module.exports = function(app, passport) {

    // GET users
    app.get('/users', function(req, res) {
        res.render('users.ejs', {
            req: req,
            page: 'users',
            message: req.flash('signupMessage')
        });
    });

    // POST register
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/users',
        failureRedirect: '/users',
        failureFlash: true
    }));

}
