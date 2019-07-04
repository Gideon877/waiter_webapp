"use strict"
const _ = require('lodash');
module.exports = function(models) { 

    const login = (req, res, done) => {

        res.render('login', {});
    }
    const signUp = (req, res, done) => {

        res.render('login', {});
    }
    const waiter = (req, res, done) => {

        res.render('login', {});
    }
    const admin = (req, res, done) => {

        res.render('login', {});
    }


    return {
        login,
        signUp,
        waiter,
        admin
    }


}