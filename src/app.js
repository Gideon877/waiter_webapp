"use strict"
const _ = require('lodash');
const Steps = require('./waiter/steps');

module.exports = function(models) {
    const steps = Steps(models);

    const Login = (req, res) => {
        return steps.Login(req.body)
    }

    return {
        Login
    }
}
