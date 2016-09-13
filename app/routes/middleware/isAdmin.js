// route middleware that makes sure that the user is an admin or
module.exports = function(req, res, next) {

    // make sure that the user is authenticated to start
    if (req.isAuthenticated()) {

        // if the user's role is admin or dev then return next
        if (req.user.local.role > 1)
            return next();

    } else {

        // redirect them to the login page
        res.redirect("/login");

    }

    // if the user isn't an admin or dev, tell them they don't have access
    res.send("You don't have access to this page.");

}
