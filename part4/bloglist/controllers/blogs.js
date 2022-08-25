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
      // since it makes the function return the response
      // and we don't to return it we need to simply send it
      // and return undefined for the if statement to properly handle it
      response.status(400).end();
    });
  if (savedBlog) {
    response.status(201).json(savedBlog.toJSON());
  }
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
