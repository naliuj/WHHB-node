// import dependencies
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');

// expose function to the app
module.exports = function(passport) {

    // =========================================================================
    // PASSPORT SESSION SETUP ==================================================
    // =========================================================================

    // used to serialize the user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true

    },
    function(req, username, password, done) {

        process.nextTick(function() {

            // check to see if the user already exists
            User.findOne({ 'local.username': username }, function(err, user) {
                // if there are errors, return the error
                if (err)
                    return done(err);

                // check to see if a user with the username already exists
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if the user doesn't exist, create the user
                    var newUser = new User();

                    // set the user's credentials
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });

                };
            });

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({

        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true

    },
    function(req, username, password, done) {

        // find a user with the username in the form
        User.findOne({ 'local.username': username }, function(err, user) {

            // if there are any errors, return the error before anyting else
            if (err)
                return done(err);

            // if no use is found, return a message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong password.'));

            // all is well, return the user
            return done(null, user);

        });

    }));

};
