const litsHelper = require('../utils/list_helper');

test(
  'dummy returns one',
  () => {
    const blogs = [];
    const result = litsHelper.dummy(blogs);
    expect(result).toBe(1);
  }
);
