const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const apiRequest = supertest(app);

const blogHelper = require('./blog_api_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const userHelper = require('./user_api_helper');

// https://stackoverflow.com/questions/52397708/how-to-pass-variable-from-beforeeach-hook-to-tests-in-jest
let token;

const newBlog = {
  title: 'New post',
  author: 'Henry',
  url: 'henry@blogs.com',
  likes: 24
};

beforeEach(async () => {
  await User.deleteMany({});
  const userResponse = await apiRequest
    .post('/api/users')
    .send(userHelper.initialUser);
  const userId = userResponse.body.id;

  const { username, password } = userHelper.initialUser;
  const response = await apiRequest
    .post('/api/login')
    .send({ username, password });
  token = response.body.token;

  await Blog.deleteMany({});
  // add user to each blog
  // https://stackoverflow.com/questions/67976030/assignment-in-a-map-function
  const blogs = blogHelper.initialBlogs.map(blog => ({ ...blog, user: userId }));
  await Blog.insertMany(blogs);
});

describe('when retrieving all blogs', () => {
  test('the blogs are returned as JSON', async () => {
    await apiRequest
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('all blogs are returned', async () => {
    const response = await apiRequest.get('/api/blogs');

    expect(response.body).toHaveLength(blogHelper.initialBlogs.length);
  });

  test('id field is named correctly', async () => {
    const response = await apiRequest.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  }, 10000);
});

describe('when adding a new blog', () => {
  test('the created blog is returned', async () => {
    await apiRequest
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await blogHelper.blogsInDatabase();
    expect(blogs).toHaveLength(blogHelper.initialBlogs.length + 1);

    const titles = blogs.map(blog => blog.title);
    expect(titles).toContain(newBlog.title);
  }, 10000);

  test('of token is not provided 401 error code is returned', async () => {
    await apiRequest
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogs = await blogHelper.blogsInDatabase();
    expect(blogs).toHaveLength(blogHelper.initialBlogs.length);
  }, 10000);

  test('if likes are missing they default to 0', async () => {
    const { title, author, url } = newBlog;

    const createdBlog = await apiRequest
      .post('/api/blogs')
      .send({ title, author, url })
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(createdBlog.body.likes).toEqual(0);
  });

  test('if title or url are missing 400 status is returned', async () => {
    const { title, author, url } = newBlog;

    await apiRequest
      .post('/api/blogs')
      .send({ title, author })
      .set('Authorization', `bearer ${token}`)
      .expect(400);

    await apiRequest
      .post('/api/blogs')
      .send({ author, url })
      .set('Authorization', `bearer ${token}`)
      .expect(400);

    const blogs = await blogHelper.blogsInDatabase();
    expect(blogs).toHaveLength(blogHelper.initialBlogs.length);
  }, 20000);
});

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const initialBlogs = await blogHelper.blogsInDatabase();
    const blogToDelete = initialBlogs[0];

    await apiRequest
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const blogsAfterDelete = await blogHelper.blogsInDatabase();

    expect(blogsAfterDelete).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAfterDelete.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test(
    'succeds with status code 200 and returns the updated blog',
    async () => {
      const initialBlogs = await blogHelper.blogsInDatabase();
      const blogToUpdate = initialBlogs[0];

      const blogDatatoUpdate = {
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        title: 'New title',
        likes: 999
      };
      const response = await apiRequest
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogDatatoUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const returnedBlog = response.body;

      expect(returnedBlog.title).toEqual(blogDatatoUpdate.title);
      expect(returnedBlog.likes).toEqual(blogDatatoUpdate.likes);
    }
  );
});

afterAll(async () => {
  mongoose.connection.close();
});
