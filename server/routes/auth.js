'use strict';
var express = require('express');
var async = require('async');
var path = require('path');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var db;
var router = express.Router();

module.exports = function(nanoDb) {
    db = nanoDb;
    return router;
};

router.post('/login', passport.authenticate('local-web', { session: false }), function(req, res) {

    // sign asynchronously
    jwt.sign({ subject: req.user }, require('../config').tokenSecret, { algorithm: 'HS256' }, function(err, token) {
        res.json({token: token});
    });

});

router.post('/mobile', passport.authenticate('local-mobile', { session: false }), function(req, res) {

    db.view('mobile-account', 'all', {key: req.body.loginEmail}, function(err, body) {
        if (err) throw err;

        //check if account is defined in mobile account, otherwise throw error.
        if (body.rows.length == 0) {
            res.status(403).end();
            return;
        }

        // sign asynchronously
        jwt.sign({ subject: req.user }, require('../config').tokenSecret, { algorithm: 'HS256' }, function(err, token) {
            res.json({token: token});
        });

    });


});
