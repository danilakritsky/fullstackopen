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
    url: 'jill@blogs.com',
    likes: 15
  },
];

const blogsInDatabase = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDatabase,
};
