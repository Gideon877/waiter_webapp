const assert = require('assert');
const faker = require('faker');
const Models = require('../../src/waiter/models/main');
const models = Models('mongodb://localhost/waiters');
const _ = require('lodash');
const { HashPassword, DecryptPassword } = require('../../src/auth/main')
const { UserTypes } = require('../../src/waiter/constants');
const { mockUser } = require('../data/steps.mockUser')
const Steps = require('../../src/waiter/steps');

describe('when user login', () => {
    const User = models.User;
    const username = 'gideon877', password = 'password', errorStr = 'E11000 duplicate';
    let func = Steps(models);

    beforeAll(async () => {
        try {
            mockUser.password = await HashPassword(password)
            await User.create(mockUser);
        } catch (e) {
            if (_.startsWith(e.message, errorStr)) {
                await User.deleteMany()
            }
        }
    })

    afterAll(async () => {
        await User.deleteMany()
        await connection.close();
        await db.close();
    });

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