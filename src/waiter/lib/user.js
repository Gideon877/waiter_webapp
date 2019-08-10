"use strict";

const _ = require('lodash')
const { DecryptPassword } = require('../../auth/main')


module.exports = (models) => {
    const User = models.User;

    const getUser = () => {
        return User.find()
    }

    const getUserByUsername = (username) => {
        return User.findOne({ username })
    }

    const getUserById = (_id) => {
        return User.findOne({ _id })
    }

    const createUser = async (userData) => {
        return User.create(userData);
    }

    /**
     * @param  {Object} param
     * @param  {Object} param.password
     * @param  {Object} param.username
     * 
     * @returns {Boolean}
     */
    const canLogin = async (param) => {
        if (_.isEmpty(param) || !param) return false;
        if (!param.password || !param.username) return false;

        const { password, username } = param;
        return getUserByUsername(username)
            .then(async (user) => (user)
                ? await DecryptPassword({ password, user })
                : false)
    }

    /**
     *(validate provided data.)
     *
     * @param {Object} userData
     * 
     * @requires {String} data.username
     * @requires {String} data.password
     * @requires {String} data.firstName
     * @requires {String} data.lastName
     * @requires {String} data.email
     * 
     * @returns {Boolean}
     */
    const isDataValid = (userData) => {
        const {
            username,
            firstName,
            lastName,
            password,
            email
        } = userData;

        if (_.isEmpty(username)) return false;
        if (_.isEmpty(firstName)) return false;
        if (_.isEmpty(lastName)) return false;
        if (_.isEmpty(password)) return false;
        if (_.isEmpty(email)) return false;

        return true;
    }

    return { getUser, getUserByUsername, canLogin, createUser, isDataValid, getUserById }
}