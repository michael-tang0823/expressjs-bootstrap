/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var cors = require('cors');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');

require('./server/auth.config')(passport);

var apiRouter = require('./server/api.js');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

if (app.get('env') === 'development') {
    app.set('json spaces', 40);
}

//middle ware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());

//security control
app.use(function(req, res, next) {

    if (req.path == '/favicon.ico') {
        return next();
    };

    if (req.path == '/api/auth/login' || req.path == '/api/auth/mobile') {
        return next();
    };

    if (!req.headers.authorization) {
        return next({status: 401, message: 'authorization header is required'})
    }

    var token = req.headers.authorization.split(" ")[1];

    //verify a token symmetric
    jwt.verify(token, require('./server/config').tokenSecret, function(err, decoded) {
        if (err) {
            return next({status: 401, message: 'authorization header is not valid'})
        }
        return next();
    });

});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);

        res.status(err.status || 500);

        res.json({'error': {
            message: err.message,
            error: err
        }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);

    res.status(err.status || 500);
    res.json({'error': {
        message: err.message,
        error: {}
    }});
});

//init data like map reduce
require('./server/init');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
