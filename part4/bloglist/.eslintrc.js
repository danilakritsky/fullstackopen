module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-console': ['off'],
    'consistent-return': ['off'],
    'no-unused-vars': ['warn'],
    'no-param-reassign': ['warn'],
    'no-underscore-dangle': ['warn'],
    'arrow-parens': ['error', 'as-needed'],
  },
};
