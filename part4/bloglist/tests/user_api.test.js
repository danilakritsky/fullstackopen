const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const apiRequest = supertest(app);

const helper = require('./user_api_helper');
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
});

test(
  'user creation succeeds',
  async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'john',
      name: 'John Doe',
      password: 'pass123!23'
    };

    await apiRequest
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  }
);
