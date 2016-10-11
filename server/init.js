var config = require('./config.js');
var fs = require('fs');
var path = require('path');
var nano = require("nano");

var db = nano(config.getUrl() + '/' + config.getDatabaseName());

var files = fs.readdirSync('./design');

files.forEach(function(file) {
    var designId = path.basename(file, path.extname(file))

    db.get('_design/' + designId, function(err, body) {
        if (err) {
            if (err.headers && err.headers.statusCode == 404) {
                var fileContent = fs.readFileSync('./design/' + file);

                db.insert(JSON.parse(fileContent),function(err, body) {
                    if (err) throw err;
                });

            } else {
                throw err;
            }

        }


    });

});

