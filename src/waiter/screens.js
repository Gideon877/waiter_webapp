"use strict"
const _ = require('lodash');
const User = require('./lib/user');
const Admin = require('./lib/admin');
const moment = require('moment');

module.exports = function (models) {
    const shared = User(models)
    const admin = Admin(models)

    const homePage = async (req, res, done) => {
        const { user } = req.session;
        if (!_.isEmpty(user)) {
            res.redirect(`/waiter/${user._id}`);
        } else {
            try {
                // await admin.addDays();
                // await admin.addUsers();
                res.render('home');
            } catch (error) {
                // console.log(error.message);
                res.render('home');
            }
        }
    }

    const signIn = (req, res, done) => {
        const user = req.session.user;
        (user) ? res.redirect(`/waiter/${user._id}`) : res.render('signIn', {});
    }
    const signUp = (req, res, done) => {
        const { user } = req.session;
        (req.session.user) ? res.redirect(`/waiter/${user._id}`) : res.render('signUp', {});
    }

    const waiterHome = async (req, res, done) => {
        const { id } = req.params;
        const { user } = req.session;
        if (_.isEmpty(id) || _.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }
        // req.session.user = user;
        // req.session.save();

        res.render('waiters', {
            user
        })
    }

    const inboxScreen = async (req, res, done) => {
        const { id } = req.params;
        const { user } = req.session;
        if (_.isEmpty(id) || _.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        const messages = await shared.getUser(); //placeholder

        let type = user.userType.toLowerCase();
        if(type == 'waiter') {
            type = type + "s"
        }
        
        res.render(`${type}/inbox`, {
            user, messages
        })
    }
    const friendsScreen = async (req, res, done) => {
        const { id } = req.params;
        const { user } = req.session;
        if (_.isEmpty(id) || _.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        const friends = await shared.getUser();
        let type = user.userType.toLowerCase();
        if(type == 'waiter') {
            type = type + "s"
        }
        
        res.render(`${type}/friends`, {
            user,
            friends
        })
    }
    const profileScreen = async (req, res, done) => {
        const { id } = req.params;
        const { user } = req.session;
        if (_.isEmpty(id) || _.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        let { created, lastUpdated } = {
            created: moment().from(user.timestamp.created),
            lastUpdated: moment().from(user.timestamp.lastUpdated),
        }

        user.timestamp = {
            created,
            lastUpdated
        }

        const state = {
            status: 'disabled'
        }

        let type = user.userType.toLowerCase();
        if(type == 'waiter') {
            type = type + "s"
        }
        
        res.render(`${type}/profile`, {
            user,
            state
        })
    }
    const scheduleScreen = async (req, res, done) => {
        const { id } = req.params;
        const user = req.session.user;
        console.log(req.session, 'req.session.user');
        
        if (_.isEmpty(id) || _.isEmpty(user)) {
            res.redirect('/login');
            return done();
        }

        let days = await admin.getDays();

        const data = await admin.findWaiterDays();

        days.forEach(element => {
            const howMany = element.waiters.length;
            element.count = howMany;
            element.available = 3 - howMany;
            var day = new Date();
            const count = day.getDay(); // 2
            const dayCount = 0;
            
            data.forEach(val => {
                if (val.dayId == element._id) {
                    element.waiters.push(id)
                    element.count++;
                    element.available--;
                    if (val.userId == id) {
                        element.status = 'checked'
                    }
                }
            })

            if(dayCount < count) {
                // element.status = 'disabled'
            }

            if(element.available > 2) {
                element.styleColor = 'green'
            } else if(element.available <= 0) {
                element.status += " disabled"
                element.available = 0
            } else if(element.available == 2) {
                element.styleColor = 'orange'
            } else {
                element.styleColor = 'red';
            }
        });
        let type = user.userType.toLowerCase();
        if(type == 'waiter') {
            type = type + "s"
        }
        
        res.render(`${type}/schedule`, {
            user,
            days: _.sortBy(days, ['uniqueId']),
        })
    }

    const adminScreen = (req, res, done) => {
        const { user } = req.session;
        (user) ? res.render('admin/admin', { user }) : res.redirect(('/login'));
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