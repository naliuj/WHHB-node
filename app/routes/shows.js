// middleware to verify the user is logged in
var isLoggedIn = require('./middleware/isLoggedIn');

// shows model
var Show = require('../models/show');

module.exports = function(app, passport) {

    // =========================================================================
    // GET shows ===============================================================
    // =========================================================================
    app.get('/shows', isLoggedIn, function(req, res) {
        // render the shows.ejs template and pass the values to it
        res.render('shows.ejs', {
            req: req,
            page: 'shows',
            message: req.flash('showMessage')
        });
    });

    // =========================================================================
    // POST shows ==============================================================
    // =========================================================================
    app.post('/shows', isLoggedIn, function(req, res) {
        // assign the form inputs to variables
        var $name = req.body.name.trim();
        var $day = req.body.day;
        var $start = req.body.start;
        var $stop = req.body.stop;
        var $hosts = [
            req.body.mem1.trim(),
            req.body.mem2.trim(),
            req.body.mem3.trim(),
            req.body.mem4.trim()
        ];
        // look for a show that already has that time slot
        Show.findOne({ 'date.day': $day, 'date.start': $start}, function(err, doc) {
            // if the time slot is free, create a show there
            if (doc == null) {
                // create the new show
                var newShow = new Show();
                // assign the variables to the new show
                newShow.name = $name;
                newShow.date.day = $day;
                newShow.date.start = $start;
                newShow.date.stop = $stop;
                newShow.hosts = $hosts;
                // save the new show
                newShow.save(function(err) {
                    if (err) {
                        // if there's an error, log it to the console and flash a message
                        console.error(err);
                        req.flash('showMessage', 'Something went wrong adding the show. Try again later.');
                    } else {
                        // if everything went as planned, flash a message
                        req.flash('showMessage', 'Successfully added the show to the database!');
                    };
                });
            // if the time slot is already taken, flash a message
            } else {
                req.flash('showMessage', 'That time slot is already taken.');
            };
            // redirect to /shows
            res.redirect('/shows');
        });
    });

};
