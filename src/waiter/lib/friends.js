"use strict";

const _ = require("lodash");
const {
    DecryptPassword
} = require("../../auth/main");

const { ConnectionStatus } = require('../constants')

module.exports = models => {
    const Friends = models.Friends;

    const findFriends = async () => {
        return Friends.find();
    }
    const getUserFriends = async (userId) => {
        return Friends.find({userId, status: ConnectionStatus.Connected});
    }
    const getFriendById = async (data) => {
        return Friends.find(data);
    }
    const getFriend = async () => {
        return Friends.find();
    }
    const getFriend = async () => {
        return Friends.find();
    }
    const getFriend = async () => {
        return Friends.find();
    }


    return {};
};