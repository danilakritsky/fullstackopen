const dummy = blogs => 1;

const totalLikes = blogs => (
  blogs.length === 0
    ? 0
    : blogs
      .map(blog => blog.likes)
      .reduce((sum, item) => sum + item, 0)
);

module.exports = {
  dummy,
  totalLikes
};
