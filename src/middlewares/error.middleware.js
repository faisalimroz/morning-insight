const sendError = require('../utils/response').sendError;

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  sendError(res, { statusCode, message });
};

module.exports = errorHandler;
