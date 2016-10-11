var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

module.exports = {
    getUrl: function() {
        if (appEnv.isLocal) {
            return 'http://test:test@localhost:5984';

        } else {
            var cloudant = appEnv.getServiceCreds('cloudant-bootstrap');
            return cloudant.url;
        }
    },

    getDatabaseName: function() {
        return 'bootstrap';
    },

    tokenSecret: '1111232111'
}