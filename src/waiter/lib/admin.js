"use strict";

const _ = require("lodash");
const days = require('../lib/days');
const faker = require('faker');
const moment = require('moment');
const { DecryptPassword, HashPassword } = require('../../auth/main');
const { UserTypes, RegEx } = require('../constants');


module.exports = models => {
    const WaiterDays = models.WaiterDays;
    const Days = models.Days;
    const User = models.User;

    const getDays = async () => {
        return Days.find();
    }

    const getWaiterDaysByUserId = async (userId) => {
        return WaiterDays.find({ userId });
    }

    const findWaiterDays = async () => {
        return WaiterDays.find();
    }

    const createWaiterDays = async (data) => {
        return WaiterDays.create(data);
    }

    const removeWaiterDaysByUserId = async (userId) => {
        return WaiterDays.deleteMany({ userId });
    }

    const addDays = async () => {
        try {
            const results = await getDays();
            if (_.isEmpty(results)) {
                await Days.create(days)
            }
        } catch (error) {
            return new Error(error.message)
        }
    }

    const addWaiters = async () => {

    }

    async function getUser() {
        let get = faker.name;
        let address = faker.address;
        let timestamp = moment.utc().local().format();
        let password = await HashPassword('password');
        return {
            firstName: get.firstName(),
            lastName: get.lastName(),
            username: faker.internet.userName(),
            password,
            email: faker.internet.email(),
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
    }

    const addUsers = async () => {
        let users = []
        const value = 20;

        for (let index = 0; value > users.length; index++) {
            let user = await getUser();
            if (index === 0) {
                user.userType = UserTypes.Admin;
                user.firstName = 'Thabang';
                user.lastName = 'Gideon';
                user.username = 'admin';
            }
            if (!users.includes(user)) {
                users.push(user);
            }
        }

        if (!_.isEmpty(users)) {
            await User.create(users);
            console.log(`${users.length} users created!`);

        } else {
            throw new Error('Failed to generate users');
        }
    }
    return {
        getDays,
        addDays,
        addUsers,
        addWaiters,
        getWaiterDaysByUserId,
        removeWaiterDaysByUserId,
        createWaiterDays,
        findWaiterDays
    };
};