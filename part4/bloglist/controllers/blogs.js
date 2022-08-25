const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body);
  const savedBlog = await newBlog
    .save()
    .catch(error => {
      // removing curly braces results in error not being catched
      response.status(400).end();
      // don't return anything only stop the request
    });
  if (savedBlog) {
    response.status(201).json(savedBlog.toJSON());
  }
});

module.exports = blogRouter;
