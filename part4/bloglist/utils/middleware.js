const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const { token } = request;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return response.status(401).json({ error: 'invalid token' });
  }

  if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }
  const user = await User.findById(decodedToken.id);

  request.user = user;

  next();
};

module.exports = { tokenExtractor, userExtractor };
