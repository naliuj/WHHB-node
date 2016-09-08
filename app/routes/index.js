var isLoggedIn = require('./middleware/isLoggedIn.js');
module.exports = function(app, passport) {

    // GET home page
    app.get('/', isLoggedIn, function(req, res) {
        // load index.ejs
        res.render('index.ejs', {
            req: req,
            page: 'index'
        });
    });

}
