const currencyService = require('../services/currencyService');
const { sendSuccess } = require('../utils/response');

const getDailyRate = async (req, res) => {
  const data = await currencyService.getDailyRate();
  return sendSuccess(res, {
    message: 'Daily currency rate fetched successfully',
    data,
  });
};

module.exports = { getDailyRate };
