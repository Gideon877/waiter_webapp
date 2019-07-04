"use strict";

const _ = require('lodash')
const { HashPassword, DecryptPassword } = require('../../auth/main')


module.exports = (models) => {
    const User = models.User;

    const getUser = () => {
        return User.find()
    }

    const getUserByUsername = (username) => {
        return User.findOne({username})
    }

/**
 * @param  {Object} param
 * @param  {Object} param.password
 * @param  {Object} param.username
 * 
 * @returns {Boolean}
 */
    const canLogin = async (param) => {
        if(_.isEmpty(param) || !param) {
            return false;
        }

        if(!param.password || !param.username) {
            return false;
        }

        const { password, username } = param;

        return getUserByUsername(username)
            .then(async (user) => (user) 
            ? await DecryptPassword({password, user})
            : false)
    }

    return { getUser, getUserByUsername, canLogin }
}