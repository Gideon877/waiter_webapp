"use strict"
const _ = require('lodash');
// const days = require('./lib/days')
const User = require('./lib/user');
const Admin = require('./lib/admin');

module.exports = function(models) { 
    const shared = User(models)
    const admin = Admin(models)

    const signIn = (req, res, done) => {

        res.render('signIn', {});
    }
    const signUp = (req, res, done) => {

        res.render('signUp', {});
    }
    const waiter = async (req, res, done) => {
        const { id } = req.params;
        if(_.isEmpty(id)) {
            res.redirect('/login');
            return done();
        }

        const user = await shared.getUserById(id);
        const days = await admin.getDays();

        if(_.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        console.log(days, 'database');
        

        res.render('waiters', {
            user,
            days
        })
        
    }
    const adminScreen = (req, res, done) => {

        res.render('login', {});
    }

    const getProfile = async (req, res, done) => {
        const { id } = req.params;
        if(_.isEmpty(id)) {
            res.redirect('/login');
            return done();
        }

        const user = await shared.getUserById(id);

        if(_.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        res.render('waiters', {user})
    }

    return {
        signIn,
        signUp,
        waiter,
        admin: adminScreen,
        profile: getProfile
    }


}