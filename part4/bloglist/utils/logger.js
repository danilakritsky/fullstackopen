const logger = {
  info: (...params) => console.log(...params),
  warn: (...params) => console.warn(...params),
  error: (...params) => console.error(...params),
};

module.exports = logger;
