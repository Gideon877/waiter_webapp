"use strict"
const _ = require('lodash');
const Func = require('./lib/user');
const Admin = require('./lib/admin');
const { DecryptPassword, HashPassword } = require('../auth/main');
const faker = require('faker');
const { UserTypes, RegEx } = require('./constants');
const days = require('./lib/days');
const moment = require('moment');


module.exports = function (models) {
    const shared = Func(models);
    const admin = Admin(models);

    const signIn = async (req, res) => {
        const { password, username } = req.body;
        
        try {
            await errorHandler({ password, username });
            await admin.addDays();
            const accessGranted = await shared.canLogin({ password, username });
            if (accessGranted) {
                const user = await shared.getUserByUsername(username)
                if(_.isEqual(user.userType, UserTypes.Admin)) {
                    res.send('admin') //change to redirect
                    return
                }

                switch (user.userType) {
                    case UserTypes.Admin:
                        res.send('admin');
                        break;
                    case UserTypes.Waiter:
                        res.redirect(`/waiter/${user._id}`);
                        break;
                    default:
                        res.send('admin');
                        break;
                }
                
                // success.body.user = grantedUser;
                // req.session.user = grantedUser;
                // res.send(success);
            } else {
                throw new Error(`Access denied for username '${username}'!`)
            }
        } catch (error) {
            fail.error = {
                code: fail.statusCode,
                message: error.message
            };

            // res.send(fail)
            res.render('signIn', fail)
        }
    }

    const AddUser = async (req, res) => {
        const data = req.body || {};
        let { password, username } = data; //|| 'password';
        // const { user } = req.session || undefined;
        // if (!_.isEmpty(user)) {
        //     success.body.user = user; res.send(success);
        // }

        try {
            await SignUpErrorHandler(data);
            password = await HashPassword(password);
            let get = faker.name;
            let address = faker.address;
            const timestamp = moment.utc().local().format();
            const userData = {
                firstName: data.firstName || get.firstName(),
                lastName: data.lastName || get.lastName(),
                username: username || faker.internet.userName,
                password: password || 'password',
                email: data.email || faker.internet.email(),
                image: faker.internet.avatar(),
                country: address.country(),
                address: address.streetAddress(),
                city: address.city(),
                code: address.countryCode(),
                phoneNumber: faker.phone.phoneNumber(),
                active: true,
                userType: UserTypes.Waiter,
                timestamp: {
                    created: timestamp,
                    lastUpdated: timestamp,
                    lastSeen: timestamp,
                }
            };

            await shared.createUser(userData);
            
            const state = {
                status: 'disabled'
            }
            
            res.render('signUp', {
                userData, state, success: {
                    message: `Successfully registered account with user ${userData.username}`
                }
            })
            
            // success.body.user = userData;
            // res.send(success);

        } catch (error) {
            let message = undefined;
            if(error.code === 11000) {
                message = 'User already exist!';
            } 

            fail.error = {
                code: fail.statusCode,
                message: message || error.message
            };
            // res.send(fail)
            res.render('signUp', fail);
        }



    }

    const addDays = async (req, res) => {
        console.log(req.body, 'body');
        const user = await shared.getUserByUsername("jd01");
        console.log(user);
        
        res.render('waiters', {days, user })
    }

    const SignUpErrorHandler = (data) => {
        const { firstName, lastName, username, password, email } = data;
        if (_.isEmpty(firstName)) {
            throw new Error('Please enter firstname')
        }
        if (_.isEmpty(lastName)) {
            throw new Error('Please enter lastname')
        }
        if (_.isEmpty(username)) {
            throw new Error('Please enter username')
        }
        if (_.isEmpty(password)) {
            throw new Error('Please enter password')
        }
        // if (!RegEx.Email.test(email)) {
        //     throw new Error('Please enter valid email address')
        // }
    }

    const errorHandler = async (data) => {
        const { username, password } = data;

        if (_.isEmpty(username) && _.isEmpty(password)) {
            throw new Error(`Username and password not provided!`)
        }
        if (_.isEmpty(username)) {
            throw new Error(`Username not provided!`)
        }
        if (_.isEmpty(password)) {
            throw new Error(`Password not provided!`)
        }
        const grantedUser = await shared.getUserByUsername(username) || {};
        if (_.isEmpty(grantedUser)) {
            throw new Error(`Username ${username} not registered!`)
        }
    }

    let fail = {
        body: {},
        statusCode: 400,
    }

    let success = {
        body: {},
        statusCode: 200,
    }

    return {
        signIn,
        Register: AddUser,
        addDays,
        // getProfile
    }

}