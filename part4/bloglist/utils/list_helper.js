const _ = require('lodash');

const dummy = blogs => 1;

const totalLikes = blogs => (
  blogs.length === 0
    ? 0
    : blogs
      .map(blog => blog.likes)
      .reduce((sum, item) => sum + item, 0)
);

const favoriteBlog = blogs => {
  if (blogs.length === 0) { return {}; }

  const sortedBlogs = [...blogs].sort(
    (blog, nextBlog) => {
      if (blog.likes > nextBlog.likes) { return 1; }
      if (blog.likes < nextBlog.likes) { return -1; }
      return 0;
    }
  );
  const { title, author, likes } = sortedBlogs[sortedBlogs.length - 1];
  return { title, author, likes };
};

const mostBlogs = bloglist => {
  if (bloglist.length === 0) { return {}; }

  if (bloglist.length === 1) {
    return { author: bloglist[0].author, blogs: 1 };
  }

  const authorWithMostBlogs = (
    _.head(
      _.orderBy(
        _.toPairs(_.countBy(_.map(bloglist, blog => blog.author))),
        pair => pair[1],
        'desc'
      )
    )
  );
  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
