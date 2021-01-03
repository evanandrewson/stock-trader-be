require('dotenv').config();
const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

jest.setTimeout(15000);

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it.skip('can sign up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'test'})
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test'
        })
      })
  });

  it.skip('can log in an existing user', () => {
    User.create({ username: 'test', password: 'test'})
      .then(() => {
        return request(app)
          .post('/api/v1/auth/login')
          .send({ username: 'test', password: 'test' })
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test'
        });
      });
  });
});