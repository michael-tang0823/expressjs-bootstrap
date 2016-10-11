'use strict';
var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var xlsx = require('xlsx');
var path = require('path');

var db;
var router = express.Router();

module.exports = function(nanoDb) {
    db = nanoDb;
    return router;
};

router.post('/', upload.single('excel_data_file'), function(req, res) {
    //get file name without extension
    var originalName = req.file.originalname;
    var fileName = path.basename(originalName, path.extname(originalName))

    //convert workbook to json
    var workbook = xlsx.readFileSync(req.file.path);
    fs.unlinkSync(req.file.path);

    var workbook_to_json = require('../excel/workbook_to_json')(workbook);

    var saveData = {
        type: 'EXCEL_DATA',
        title: fileName,
        excelData: workbook_to_json,
        uploadTime: new Date()
    };

    db.insert(saveData,function(err, body) {
        if (err) throw err;

        res.json(saveData);
    });
});

router.get('/latest', function(req, res) {
    db.view('uploads', 'all', {descending: true, limit: 1, include_docs: true}, function(err, body) {
        if (err) throw err;

        if (body.rows && body.rows.length == 1) {

            var result = body.rows[0].doc;
            res.json(result);

        } else {
            res.status(404);
            res.end();
        }

    });
});

router.get('/latestPublished', function(req, res) {
    db.view('uploads', 'published', {descending: true, limit: 1, include_docs: true}, function(err, body) {
        if (err) throw err;

        if (body.rows && body.rows.length == 1) {

            var result = body.rows[0].doc;
            res.json(result);

        } else {
            res.status(404);
            res.end();
        }

    });
});

router.get('/', function(req, res) {
    db.view('uploads', 'all', {descending: true}, function(err, body) {
        if (err) throw err;

        res.json(body);

    });
});

router.get('/:docId', function(req, res) {
    db.get(req.params.docId, function(err, body) {
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

router.post('/:docId/publish', function(req, res) {
    db.get(req.params.docId, function(err, body) {
        if (err) throw err;

        body.published = true;
        body.publishedTime = new Date();

        db.insert(body, function(err, body) {
            if (err) throw err;

            res.json(body);
        });

    });
});

router.post('/:docId/unpublish', function(req, res) {
    db.get(req.params.docId, function(err, body) {
        if (err) throw err;

        delete body.published;
        delete body.publishedTime;

        db.insert(body, function(err, body) {
            if (err) throw err;

            res.json(body);
        });

    });
});
