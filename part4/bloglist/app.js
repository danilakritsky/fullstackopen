const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

const mongoUrl = config.MONGODB_URI;

logger.info('Connecting to MongoDB...');
mongoose.connect(mongoUrl)
  .then(() => logger.info('Connected to MongoDB.'))
  .catch(error => logger.error('Error connecting to MongoDB: ', error));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;