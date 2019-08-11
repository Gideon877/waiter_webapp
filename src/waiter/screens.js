"use strict"
const _ = require('lodash');
const User = require('./lib/user');
const Admin = require('./lib/admin');
const moment = require('moment');

module.exports = function (models) {
    const shared = User(models)
    const admin = Admin(models)

    const homePage = async (req, res, done) => {
        try {
            await admin.addDays();
            await admin.addUsers();
            res.render('home');
        } catch (error) {
            // console.log(error.message);
            res.render('home');
        }
    }

    const signIn = (req, res, done) => {
        res.render('signIn', {});
    }
    const signUp = (req, res, done) => {
        res.render('signUp', {});
    }

    const waiterHome = async (req, res, done) => {
        const { id } = req.params;
        await admin.addDays();
        if (_.isEmpty(id)) {
            res.redirect('/login');
            return done();
        }

        const user = await shared.getUserById(id);

        if (_.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        res.render('waiters', {
            user
        })
    }

    const inboxScreen = async (req, res, done) => {
        const { id } = req.params;
        if (_.isEmpty(id)) {
            res.redirect('/login')
        }

        const user = await shared.getUserById(id);
        const messages = await shared.getUser(); //placeholder

        if (_.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        res.render('waiters/inbox', {
            user, messages
        })
    }
    const friendsScreen = async (req, res, done) => {
        const { id } = req.params;
        if (_.isEmpty(id)) {
            res.redirect('/login')
        }

        const user = await shared.getUserById(id);
        const friends = await shared.getUser();

        if (_.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        res.render('waiters/friends', {
            user,
            friends
        })
    }
    const profileScreen = async (req, res, done) => {
        const { id } = req.params;
        if (_.isEmpty(id)) {
            res.redirect('/login')
        }

        const user = await shared.getUserById(id);
        let { created, lastUpdated } = {
            created: moment().from(user.timestamp.created),
            lastUpdated: moment().from(user.timestamp.lastUpdated),
        }

        user.timestamp = {
            created,
            lastUpdated
        }

        if (_.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }
        const state = {
            status: 'disabled'
        }

        res.render('waiters/profile', {
            user,
            state
        })
    }
    const scheduleScreen = async (req, res, done) => {
        const { id } = req.params;
        if (_.isEmpty(id)) {
            res.redirect('/login')
        }

        const user = await shared.getUserById(id);
        let days = await admin.getDays();

        const data = await admin.findWaiterDays();

        days.forEach(element => {
            const howMany = element.waiters.length;
            element.count = howMany;
            element.available = 3 - howMany;

            data.forEach(val => {
                if (val.dayId == element._id) {
                    element.waiters.push(id)
                    element.count++;
                    element.available--;
                    if(val.userId == id) {
                        element.status = 'checked'
                    }
                }
            })
        });

        if (_.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        res.render('waiters/schedule', {
            user,
            days: _.sortBy(days, ['uniqueId']),
        })
    }

    const adminScreen = (req, res, done) => {
        res.render('login', {});
    }

    return {
        signIn,
        signUp,
        waiter: waiterHome,
        admin: adminScreen,
        profile: profileScreen,
        friends: friendsScreen,
        inbox: inboxScreen,
        schedule: scheduleScreen,
        homePage
    }
}