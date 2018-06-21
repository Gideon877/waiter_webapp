"use strict"
const days = require('../lib/days')

// console.log(days);

module.exports = function(models) {

    const mongoDB = models.Waiter;
    
    const getAdminScreen = (req, res, done) => {

        res.render('days')
    };

    const getLoginScreen = (req, res, done) => {

        res.render('login')
    };

    const getRegistrationScreen = (req, res, done) => {
        res.render('register')
    };

    const getWaiterScreen = (req, res, done) => {

        res.render('waiter')
    };


    return {
        getAdminScreen,
        getLoginScreen,
        getRegistrationScreen,
        getWaiterScreen
    }
}