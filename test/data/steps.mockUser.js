'use strict'

const faker = require('faker');
const { UserTypes } = require('../../src/waiter/constants');

const get = faker.name;
const address = faker.address;
const username = 'gideon877', password = 'password';

const mockUser = {
    firstName: get.firstName(),
    lastName: get.lastName(),
    username,
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
};

module.exports = {
    mockUser
}