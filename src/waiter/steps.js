"use strict"
const _ = require('lodash');
const Func = require('./lib/func');


module.exports = function (models) {
    const shared = Func(models)

    const Login = async (req, res) => {
        const { password, username } = req.body || {}
        try {
            if (_.isEmpty(password) || _.isEmpty(username)) {
                throw new Error(`username or password not provided!`)
            }
            const accessGranted = await shared.canLogin({ password, username });
            if (accessGranted) {
                const grantedUser = await shared.getUserByUsername(username) || {};
                success.body.user = grantedUser;
                // console.log('grantedUser', success,  success);
                // req.session.user = grantedUser;
                res.send(success);
            } else {
                throw new Error(`access denied with username '${username}'!`)
            }
        } catch (error) {
            fail.error = {
                code: fail.statusCode ,
                message: error.message
            };
            res.send(fail)
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
        Login
    }

}