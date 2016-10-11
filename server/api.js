var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var config = require('./config.js');

var nano = require("nano");

var db = nano(config.getUrl() + '/' + config.getDatabaseName());

var apiRouter = express.Router();

apiRouter.use('/uploads', require('./routes/upload.js')(db));

apiRouter.use('/mobile-account', require('./routes/mobile-account.js')(db));

apiRouter.use('/auth', require('./routes/auth')(db));

module.exports = apiRouter;