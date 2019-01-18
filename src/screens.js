'use strict'

const _ = require('lodash');
const moment = require('moment');
const SHARED = require('./lib/shared');
const { Days } = require('./lib/constant');


module.exports = (models) => {
    const Shared = SHARED(models);

    const signIn = async (req, res, done) => {
        res.render('signIn');
    };

    const signUp = async (req, res, done) => {
        res.render('signUp');
    };

    const waiter = async (req, res, done) => {
        const { id } = req.params;
        console.log(req.body)
        const user = await Shared.getUserById(id);
        res.render('waiters', { user, days: Days });
    };

    const admin = async (req, res, done) => {
        res.render('admin');
    };

    return {
        signUp,
        signIn,
        waiter,
        admin
    }
}