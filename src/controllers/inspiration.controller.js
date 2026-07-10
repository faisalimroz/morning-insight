const inspirationService = require('../services/inspiration.service');
const { sendSuccess } = require('../utils/response');

const getDailyInspiration = async (req, res) => {
  const inspiration = await inspirationService.getDailyInspiration(req.user.id);
  return sendSuccess(res, {
    message: 'Daily inspiration fetched successfully',
    data: inspiration,
  });
};

module.exports = {
  getDailyInspiration,
};
