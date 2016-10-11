var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.use('local-web', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {

            if (username == "test@example.com" && password == 'test') {
                return done(null, username);
            } else {
                return done(null, false, { message: 'Incorrect email and password.' });
            }


        }

    ));

    passport.use('local-mobile', new LocalStrategy(
        {
            usernameField: 'clientId',
            passwordField: 'clientSecret'
        },
        function(clientId, clientSecret, done) {

            if (clientId == "test@example.com" && clientSecret == 'test') {
                return done(null, clientId);
            } else {
                return done(null, false, { message: 'Incorrect client id and client secret.' });
            }


        }

    ));

}
