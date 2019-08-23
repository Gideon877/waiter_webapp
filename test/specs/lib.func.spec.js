const assert = require('assert');
const faker = require('faker');
const Models = require('../../src/waiter/models/main');
const models = Models('mongodb://localhost/waiters', { useNewUrlParser: true });
const _ = require('lodash');
const { HashPassword, DecryptPassword } = require('../../src/auth/main')
const { UserTypes } = require('../../src/waiter/constants');
const { mockUser } = require('../data/steps.mockUser')
const Func = require('../../src/waiter/lib/user');

describe('when user login', () => {
    const User = models.User;
    const username = 'gideon877', password = 'password', errorStr = 'E11000 duplicate';
    let func = Func(models);

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
        await User.deleteOne({ username })
        await connection.close();
        await db.close();
    });

    describe('user should', () => {
        test('1.0 Login successfully', async () => {
            const accessGranted = await func.canLogin({ password, username });
            expect(accessGranted).toBeTruthy();
        })

        test('1.1 => Wrong password: fail to login', async () => {
            const accessGranted = await func.canLogin({ password: '00000000', username });
            expect(accessGranted).toBeFalsy()
        })

        test('1.2 => No Password: fail to login', async () => {
            const accessGranted = await func.canLogin({ username });
            expect(accessGranted).toBeFalsy()
        })

        test('1.3 => No username: fail to login', async () => {
            const accessGranted = await func.canLogin({ password });
            expect(accessGranted).toBeFalsy()
        })

        test('1.4 => No data: fail to login', async () => {
            const accessGranted = await func.canLogin({});
            expect(accessGranted).toBeFalsy()
        })
    })

})