// route middleware to make sure the user isn't logged in
module.exports = function(req, res, next) {

    // if user isn't authenticaed in session, carry on
    if (!req.isAuthenticated())
        return(next());

    // if the user is authenticated, redirect them to the home page
    res.redirect('/');

}
