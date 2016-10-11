'use strict';
var express = require('express');
var async = require('async');
var path = require('path');

var db;
var router = express.Router();

module.exports = function(nanoDb) {
    db = nanoDb;
    return router;
};

router.post('/', function(req, res) {

    var createTime = new Date();

    if (req.body && req.body.emails && req.body.emails.length > 0) {

        async.filter(req.body.emails, function(email, callback) {

            if (!email) {
                return callback(null, null);
            }

            db.view('mobile-account', 'all', {limit: 1, key: email}, function(err, body) {
                if (err) {
                    return callback(err);
                }

                if (body && body.rows && body.rows.length > 0) {
                    return callback(null, null);

                } else {
                    var saveData = {
                        type: 'MOBILE_ACCOUNT',
                        email: email,
                        createTime: createTime
                    };

                    db.insert(saveData,function(err, body) {
                        if (err) {
                            return callback(err);
                        }

                        callback(null, email);

                    });
                }


            });

        }, function(err, results) {
            res.json(results);
        });

    }

});

router.get('/', function(req, res) {
    db.view('mobile-account', 'all', function(err, body) {
        if (err) throw err;

        res.json(body);

    });
});

router.delete('/:docId', function(req, res) {
    db.get(req.params.docId, function(err, body) {
        if (err) throw err;

        db.destroy(req.params.docId, body._rev, function(err, body) {
            if (err) throw err;

            res.json(body);
        });

    });


});

router.get('/:email', function(req, res) {
    db.view('mobile-account', 'all', {key: req.params.email}, function(err, body) {
        if (err) throw err;

        res.json(body);

    });


});
