const assert = require('assert');
const Models = require('../models/models');

describe('modules should be able to', function() {

    var models = Models('mongodb://localhost/waiters-tests');

    beforeEach(function(done) {
        models.Username.remove({}, function(err) {
            if (err) {
                done(err)
            }
            models.Username.create({
                username: 'gideon877',
                password: 1234,
                days: ['Tuesday', 'Wednesday', 'Friday']
            }, function(err, user) {
                done(err);
            });
        });
    });

    it('store User details to MongoDB', function(done) {
        models.Username.create({
            name: 'Vusi Baloyi',
            username: 'Ta-Vusi',
            password: 8888
        }, function(err, result) {
            if (err) {
                return done(err)
            }

            assert.equal("Ta-Vusi", result.username)
            done(err);
        });
    });

    it('register/create a new unique "User" with password & username', function(done) {

        models.Username.findOne({
            username: 'King',
            password: 5555
        }, function(err, theUsername) {

            if (err) {
                //test fail if there is an error
                return done(err)
            }

            // theUsername is not in the Datase
            assert.ok(theUsername === null);

            if (!theUsername) {
                models.Username.create({
                    name: 'King Gideon',
                    username: 'King',
                    password: 9001
                }, function(err) {
                    if (err) {
                        return done(err);
                    }
                    // check if the user was created
                    models.Username.find({
                        username: 'King',
                        password: 9001
                    }, function (err, result) {
                        if (err) {
                            return done(err)
                        }

                        assert.equal(1, result.length);
                        assert.equal("King", result[0].username);
                        assert.equal(9001, result[0].password);
                        done();
                    })
                });
            }
        })
    });

    it('clear weekly schedule', function(done) {
        models.Username.find({}, function (err, user) {
            if (err) {
                return done(err)
            }

            for (var i = 0; i < user.length; i++) {
                user[i].days = [];
                user[i].save(function(err, result) {
                    if (err) {
                        return done(err);
                    };
                });

                assert.equal(0, user[i].days.length);
            }

            done();
        })
    })

    it('rejects duplicate', function(done) {

        models.Username.findOne({
            username: 'gideon877',
            password: 1234
        }, function(err, theUsername) {
            if (err) {
                //test fail if there is an error
                return done(err)
            }

            // theUsername is not in the Database
            assert.ok(theUsername !== null);
            if (theUsername) {
                assert.equal('gideon877', theUsername.username);
                done();
            }

        });
    });
});
