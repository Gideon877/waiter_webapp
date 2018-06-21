"use strict";

const moment = require('moment');
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports = function(models) {
    const mongoDB = models.Waiter;
    const validate = (req, res, done) => {
        const body = req.body;
        (req.session && req.session.user) ? res.redirect('/') : createUser(body, { res, req, done });
    }

    function createUser(body, argument) {
        let { res, req, done } = argument;
        let { username, name, surname, password } = body;
        const getUser = {
            name,
            surname,
            password,
            username,
            timestamp: {
                created: moment().format('MMMM Do YYYY, h:mm:ss a'),
                lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
                lastSeen: moment().format('MMMM Do YYYY, h:mm:ss a'),
            }, 
        }
        
        mongoDB.findOne({ username }, (err, user) => {
            if (err) return done(err);
            (user) ? 
                (
                    req.flash('error', 'Username already exist!') &&
                    res.render('register')
                ) : 
                (
                    mongoDB.create(getUser, (err, newUser) => {
                        if (err) return done(err);

                        bcrypt.genSalt(15, function(err, salt) {
                            if (err)
                                return done(err);
    
                            bcrypt.hash(password, salt, function(err, hash) {
                                if (err)
                                    return done(err);
    
                                newUser.password = hash;
                                req.session.user = newUser;
                                console.log('newUser', newUser);
                                newUser.save();
                                done();
                            });
                        });
                        
                        res.render('register', { newUser });
                    })
                )
        });
    }
    return {
        validate
    }
}


// days: {
            //     count: 1,
            //     first: moment().format('MMMM Do YYYY, h:mm:ss a'),
            //     last: moment().format('MMMM Do YYYY, h:mm:ss a'),
            //     type: day
            // }