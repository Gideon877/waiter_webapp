'use strict'

const _ = require('lodash');
const moment = require('moment');
const SHARED = require('./lib/shared');
const { UserTypes } = require('./lib/constant')

module.exports = (models) => {
    const Shared = SHARED(models);


    const signIn = (req, res) => {
        const { username, password, firstName, lastName } = req.body;

        try {
            const checkUser = await Shared.checkUserLoginData(username, password);
            return (checkUser ? Login(username) : Retry(username));
            
        } catch (error) {
            res.render('signUp');
        }
    };









    const Login = async (username) => {
        let user = await Shared.getUserByUsername(username);
        req.session.user = user;
        (user.type == UserTypes.Admin) ? res.redirect('/days') : res.redirect(`/waiters/${user._id}`);
    };

    const Retry = async (username) => {
        req.flash('error', `${username} doesn't exist or you have entered incorrect password!`);
        res.render('login');
    };

    return {
        // signUp,
        // signIn,
        // addDays,
        // dashBoard,
        // getWaitersDays,
        // resetWeeklyShift
    }
}