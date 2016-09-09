// IMPORT DEPENDENCIES
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// CONNECT TO THE DATABASE
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);

// PASS PASSPORT FOR CONFIGURATION
require('./config/passport')(passport);

// SET UP THE EXPESS APPLICATION
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies(needed for authentication)
app.use(bodyParser.urlencoded({ extended: true})); // body parser parses text as url encoded
app.use(bodyParser.json()); // body parser parses text as json
app.use(express.static('public')); // set the public folder for static files
app.use(session({
    secret: 'app secret', // set session secret
    resave: true, // set resave
    saveUninitialized: true // set saveUninitialized
}));
app.set('view engine', 'ejs'); // set up EJS for templating


// REQUIRED FOR PASSPORT
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ROUTES
require('./app/routes/index')(app, passport);
require('./app/routes/login')(app, passport);
require('./app/routes/users')(app, passport);
require('./app/routes/shows')(app, passport);

// API ROUTES
require('./app/routes/api/shows')(app, passport);

// LAUNCH
app.listen(port);
console.log('Server running on port ' + port);
