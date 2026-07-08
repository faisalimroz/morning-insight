const sendSuccess = (res, { statusCode = 200, message, token, data }) => {
  const body = { success: true, statusCode, message };

  if (token) body.token = token;
  if (data !== undefined) body.data = data;

  return res.status(statusCode).json(body);
};

const sendError = (res, { statusCode = 500, message }) =>
  res.status(statusCode).json({ success: false, statusCode, message });

module.exports = { sendSuccess, sendError };
