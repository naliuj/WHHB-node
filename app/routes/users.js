module.exports = function(app, passport) {

    // GET users
    app.get('/users', function(req, res) {
        res.render('users.ejs');
    });

    // POST register
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/users',
        failureRedirect: '/users',
        failureFlash: true
    }));

}
