const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

const mongoUrl = config.MONGODB_URI;

logger.info('Connecting to MongoDB...');
mongoose.connect(mongoUrl)
  .then(() => logger.info('Connected to MongoDB.'))
  .catch(error => logger.error('Error connecting to MongoDB: ', error));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
// app.use('/api/blogs', middleware.userExtractor, blogRouter) // to set for all router paths
// middleware can also be set for a specific method in its route handler
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
