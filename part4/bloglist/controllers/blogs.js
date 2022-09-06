const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { user } = request;
  const newBlog = new Blog({ ...request.body, user: user._id });
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
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  }
});

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request;
  const blogToDelete = await Blog.findById(request.params.id);
  if (blogToDelete.user.toString() !== user.id) {
    return response.status(403).json(
      { error: "cannot delete other users' posts" }
    );
  }
  await blogToDelete.delete();
  user.blogs = user.blogs.filter(blog => blog.id !== request.params.id);
  user.save();
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, request.body, { new: true },);
  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
