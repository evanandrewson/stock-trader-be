require('dotenv').config();
const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

jest.setTimeout(15000);

describe.only('portfolio routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('user signup creates portfolio and you can get portfolio by logged in user', () => {
    const agent = request.agent(app);
    return agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'test'})
      .then(user => {
        return agent
          .get('/api/v1/portfolio/')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
              _id: expect.any(String),
              user: user.body._id,
              stocks: [],
              cash: 100000,
              __v: expect.any(Number)
            })
          })
      })
  })
})