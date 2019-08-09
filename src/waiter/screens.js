"use strict"
const _ = require('lodash');
module.exports = function(models) { 

    const signIn = (req, res, done) => {

        res.render('signIn', {});
    }
    const signUp = (req, res, done) => {

        res.render('signUp', {});
    }
    const waiter = (req, res, done) => {

        res.render('login', {});
    }
    const admin = (req, res, done) => {

        res.render('login', {});
    }


    return {
        signIn,
        signUp,
        waiter,
        admin
    }


}