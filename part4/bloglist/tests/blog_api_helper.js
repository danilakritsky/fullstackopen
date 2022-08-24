const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'First post',
    author: 'Jack',
    url: 'jack@blogs.com',
    likes: 3
  },
  {
    title: 'Another post',
    author: 'Jill',
    url: 'jack@blogs.com',
    likes: 15
  },
];

module.exports = {
  initialBlogs
};
