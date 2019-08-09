"use strict"
const _ = require('lodash');
const Func = require('./lib/user');
const { DecryptPassword, HashPassword} = require('../auth/main');
const faker = require('faker');
const { UserTypes } = require('./constants');

module.exports = function (models) {
    const shared = Func(models)

    const Login = async (req, res) => {
        const { password, username } = req.body;
        try {

            await errorHandler({password, username});
            
            const accessGranted = await shared.canLogin({ password, username });
            if (accessGranted) {
                success.body.user = grantedUser;
                // req.session.user = grantedUser;
                res.send(success);
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

        const { user } = req.session || undefined;
        if (!_.isEmpty(user)) {
            success.body.user = user; res.send(success);
        }

        try {
            const data = req.body || {};
            let { password } = data || 'password';
            password = await HashPassword(password);

            if (_.isEmpty(data))
                throw new Error(`username or password not provided!`);

            const username = data.username || faker.internet.userName;
            const get = faker.name;
            const address = faker.address;
            const userData = {
                firstName: data.firstName || get.firstName(),
                lastName: data.lastName || get.lastName(),
                username: data.username || faker.internet.userName,
                password: password,
                email: data.email || faker.internet.email(),
                image: faker.internet.avatar(),
                country: address.country(),
                address: address.streetAddress(),
                city: address.city(),
                code: address.countryCode(),
                phoneNumber: faker.phone.phoneNumber(),
                active: true,
                userType: UserTypes.Waiter,
            };

            const canRegister = await shared.isDataValid(userData);
            if (canRegister) { 
                await shared.createUser(userData); 
                const grantedUser = await shared.getUserByUsername(username) || {};
                success.body.user = grantedUser;
                // console.log('grantedUser', success,  success);
                // req.session.user = grantedUser;
                res.send(success);
            }

        } catch (error) {
            fail.error = {
                code: fail.statusCode,
                message: error.message
            };
            res.send(fail)
        }



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
        if(_.isEmpty(grantedUser)) {
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
        Login,
        Register: AddUser,
    }

}