// route middleware to make sure that the user is logged in
module.exports = function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if the user isn't authenticated, redirect them to the login page
    res.redirect('/login');

}
