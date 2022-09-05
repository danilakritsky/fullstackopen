const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user');
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const user = await User.findOne();

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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, request.body, { new: true },);
  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
