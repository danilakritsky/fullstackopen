const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const apiRequest = supertest(app);

const userHelper = require('./user_api_helper');
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  await User.create(userHelper.initialUser);
});

test(
  'user creation succeeds',
  async () => {
    const usersAtStart = await userHelper.usersInDb();
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

    const usersAtEnd = await userHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  }
);

test(
  'user creation failes if username already exists',
  async () => {
    const usersAtStart = await userHelper.usersInDb();
    const newUser = {
      username: 'root',
      name: 'root',
      password: 'pass123!23'
    };

    const response = await apiRequest
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('username must be unique');
    const usersAtEnd = await userHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }
);

test(
  'user creation failes if password length is less than 3',
  async () => {
    const usersAtStart = await userHelper.usersInDb();
    const newUser = {
      username: 'New User',
      name: 'newuser123',
      password: '12'
    };

    const response = await apiRequest
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('password');
    const usersAtEnd = await userHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }
);

test(
  'user creation failes if password username is less than 3',
  async () => {
    const usersAtStart = await userHelper.usersInDb();
    const newUser = {
      username: 'hi',
      name: 'newuser123',
      password: '12312ads'
    };

    const response = await apiRequest
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('username');
    const usersAtEnd = await userHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }
);

afterAll(async () => {
  await User.deleteMany({});
});
