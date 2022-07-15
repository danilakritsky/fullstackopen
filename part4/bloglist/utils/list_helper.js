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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
