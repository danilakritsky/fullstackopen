const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const apiRequest = supertest(app);

const helper = require('./blog_api_helper');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs returned as json', async () => {
  await apiRequest
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await apiRequest.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id field is named correctly', async () => {
  const response = await apiRequest.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});


afterAll(() => {
  mongoose.connection.close();
});
