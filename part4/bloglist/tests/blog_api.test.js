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

test('the created blog is returned', async () => {
  const newBlog = {
    title: 'New post',
    author: 'Henry',
    url: 'henry@blogs.com',
    likes: 24
  };

  await apiRequest
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await helper.blogsInDatabase();
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogs.map(blog => blog.title);
  expect(titles).toContain(newBlog.title);
});

test('if likes are missing default to 0', async () => {
  const newBlog = {
    title: 'New post',
    author: 'Henry',
    url: 'henry@blogs.com',
  };

  const createdBlog = await apiRequest
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(createdBlog.body.likes).toEqual(0);
});

test('if title or url are missing cause 400 error', async () => {
  const newBlogNoUrl = {
    title: 'New post',
    author: 'Henry'
  };

  await apiRequest
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400);

  const newBlogNoTitle = {
    author: 'Henry',
    url: 'henry@blogs.com',
  };

  await apiRequest
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400);

  const blogs = await helper.blogsInDatabase();
  expect(blogs).toHaveLength(helper.initialBlogs.length);
}, 20000);

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const initialBlogs = await helper.blogsInDatabase();
    const blogToDelete = initialBlogs[0];

    await apiRequest
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDatabase();

    expect(blogsAfterDelete).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAfterDelete.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating the number of likes', () => {
  test(
    'succeds with status code 200 and returns the updated note',
    async () => {

    }
  );
});

afterAll(() => {
  mongoose.connection.close();
});
