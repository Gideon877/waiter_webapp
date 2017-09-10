const assert = require('assert');
const Models = require('../models');

describe('modules should be able to', function() {

    var models = Models('mongodb://localhost/waiters-tests');

    beforeEach(function(done) {
        models.Username.remove({}, function(err){
            if(err){
                done(err)
            }
            models.Username.create({
                username: 'admin',
                password: ****
            }, function(err){
                done(err);
            });
        });
    });

    it('store Usernames to MongoDB', function(done) {
        models.Username.create({
            name: 'Vusi',
            username: 'V9',
            password: '****'
        }, function(err) {
                models.Username.findOne({
                    username: 'V9',
                    password: '****'
                }, function(err, result) {
                    assert.equal("Vusi", result.name)
                    done(err);
                });
            });
    });
});
