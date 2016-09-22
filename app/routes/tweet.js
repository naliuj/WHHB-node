// middleware to make sure that the user is logged in
var isLoggedIn = require('./middleware/isLoggedIn');

// expose the route to the app
module.exports = function(app, passport, twitter) {

    // GET the /tweet route
    app.get('/tweet', isLoggedIn, function(req, res) {
        // render the tweet.ejs template
        res.render('tweet.ejs', {
            req: req,
            page: 'tweet'
        });
    });

    // POST the /tweet route
    app.post('/tweet', isLoggedIn, function(req, res) {
        // assign the tweet body to a variable
        var $tweet = req.body.tweetBody;
        // POST to twitter
        twitter.post('/statuses/update', { status: $tweet },
        function(err, tweet, response) {
            if (err) console.error(err);
            res.redirect('/tweet');
        });
    });

}
