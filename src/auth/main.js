"use strict";

const _ = require('lodash')
const bcrypt = require('bcrypt')
const BCryptRounds = 6;

/**
 * @param  {String} password
 */
const HashPassword = param => {
    const password = _.isString(param) ? param : param.toString();
    return bcrypt
        .genSalt(BCryptRounds)
        .then(salt => {
            return bcrypt.hash(password, salt).then(result => {
                return result;
            });
        })
        .catch(err => {
            return err;
        });
};

/**
 * @param  {Object} param
 * @param  {String} param.password
 * @param  {Object} param.user
 * @param  {String} param.user.password
 */
const DecryptPassword = param => {
    let { password, user } = param || {};
    return bcrypt
        .compare(password, user.password)
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
};

module.exports = {
    DecryptPassword,
    HashPassword
}
