const assert = require('assert');
const faker = require('faker');
const Models = require('../../src/waiter/models/main');
const models = Models('mongodb://localhost/waiters');
const _ = require('lodash');
const { HashPassword, DecryptPassword } = require('../../src/auth/main')
const { UserTypes } = require('../../src/waiter/constants');
const { mockUser } = require('../data/steps.mockUser')
const Steps = require('../../src/waiter/steps');
const MyFacFunctions = require('../../src/waiter/lib/user');

describe('when user login', () => {
    const User = models.User;
    const username = 'gideon877', password = 'password', errorStr = 'E11000 duplicate';
    const myFacFunctions = MyFacFunctions(models);
    // const myFacFunctions = MyFacFunctions(models);

    beforeAll(async () => {
        try {
            mockUser.password = await HashPassword(password)
            await User.create(mockUser);
        } catch (e) {
            if (_.startsWith(e.message, errorStr)) {
                await User.deleteOne({username})
            }
        }
    })

    afterAll(async () => {
        await User.deleteOne({username})
        await connection.close();
        await db.close();
    });

    describe('add new user', () => {
        const userData = {
            firstName: 'firstName',
            lastName: 'lastName',
            username: 'username',
            password: 'password',
            email: 'email@email.com',
        }

        test('should return true if username is provided', async () => {
            const results = await myFacFunctions.isDataValid(userData);
            expect(results).toBeTruthy();
        })

        test('should return false if username is not provided', async () => {
            const results = await myFacFunctions.isDataValid({});
            expect(results).toBeFalsy();
        })

        test('should return true if firstName is provided', async () => {
            const results = await myFacFunctions.isDataValid(userData);
            expect(results).toBeTruthy();
        })

        test('should return false if firstName is not provided', async () => {
            const results = await myFacFunctions.isDataValid({username});
            expect(results).toBeFalsy();
        })

        test('should return true if lastName is provided', async () => {
            const results = await myFacFunctions.isDataValid(userData);
            expect(results).toBeTruthy();
        })

        test('should return false if lastName is not provided', async () => {
            const results = await myFacFunctions.isDataValid({email: 'email', username, firstName: 'firstName', password});
            expect(results).toBeFalsy();
        })

        test('should return true if password is provided', async () => {
            const results = await myFacFunctions.isDataValid(userData);
            expect(results).toBeTruthy();
        })

        test('should return false if password is not provided', async () => {
            const results = await myFacFunctions.isDataValid({username, firstName: 'firstName', lastName: 'lastName', email: 'email'});
            expect(results).toBeFalsy();
        })

        test('should return true if email is provided', async () => {
            const results = await myFacFunctions.isDataValid(userData);
            expect(results).toBeTruthy();
        })

        test('should return false if email is not provided', async () => {
            const results = await myFacFunctions.isDataValid({username, firstName: 'firstName', lastName: 'lastName', password});
            expect(results).toBeFalsy();
        })

        test('should return true if all requirements are provided', async () => {
            const results = await myFacFunctions.isDataValid(userData);
            expect(results).toBeTruthy();
        })

        test('should return false if requirements is not provided', async () => {
            const results = await myFacFunctions.isDataValid({});
            expect(results).toBeFalsy();
        })
    })


    describe('user should', () => {
        test('', () => expect(1).toBe(1))
        // test('1.0 Login successfully', async () => {
        //     const accessGranted = await func.Login({ password, username });
        //     // expect(accessGranted).toBeTruthy()
        //     expect().toBeNull()
        // })

        // test('1.1 => Wrong password: fail to login', async () => {
        //     const accessGranted = await func.Login({ password: '00000000', username });
        //     // expect(accessGranted).toBeFalsy()
        //     expect().toBeNull()
        // })

        // test('1.2 => No Password: fail to login', async () => {
        //     const accessGranted = await func.Login({ username });
        //     // expect(accessGranted).toBeFalsy()
        //     expect().toBeNull()
        // })

        // test('1.3 => No username: fail to login', async () => {
        //     const accessGranted = await func.Login({ password });
        //     // expect(accessGranted).toBeFalsy()
        //     expect().toBeNull()
        // })

        // test('1.4 => No data: fail to login', async () => {
        //     const accessGranted = await func.Login({});
        //     // expect(accessGranted).toBeFalsy()
        //     expect().toBeNull()
        // })  
    })

})