const assert = require('assert');
const { MongoClient } = require('mongodb');
const faker = require('faker');
// const Models = require('../../src/waiter/models/main');
// const models = Models('mongodb://localhost/waiters-tests');
const { HashPassword, DecryptPassword } = require('../../src/auth/main')

describe('auth functions', () => {
    let connection, db, users, mockUser;
    const password = 'password';

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost/waiters-tests');
        db = await connection.db('waiters-tests')
        users = db.collection('User');
        mockUser = { _id: 'some-user-id', name: 'John' };
    })

    afterAll(async () => {
        await users.remove()
        await connection.close();
        await db.close();
    });
    describe('HashPassword should be able to', () => {
        test('hash password', async () => {
            // Hash Password
            const hashedPassword = await HashPassword(password);
            mockUser.password = hashedPassword;

            await users.insertOne(mockUser);

            const insertedUser = await users.findOne({ _id: 'some-user-id' });

            expect(insertedUser).toEqual(mockUser);
        })
    })

    describe('DecryptPassword should be able to', () => {
        test('decrypt password', async () => {
            const insertedUser = await users.findOne({ _id: 'some-user-id' });

            const isCorrectPassword = await DecryptPassword({ password, user: insertedUser });
            expect(isCorrectPassword).toBeTruthy()


        })

    })
})