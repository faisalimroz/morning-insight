const breakingNewsService = require('../services/breakingNews.service');
const { sendSuccess } = require('../utils/response');
const { listQuerySchema, validate } = require('../validators/contentItem.validator');

const getBreakingNews = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await breakingNewsService.getBreakingNews(filters);
  return sendSuccess(res, {
    message: 'Breaking news fetched successfully',
    data: result,
  });
};

const getBreakingNewsById = async (req, res) => {
  const item = await breakingNewsService.getBreakingNewsById(req.params.id, true);
  return sendSuccess(res, {
    message: 'Breaking news fetched successfully',
    data: item,
  });
};

module.exports = {
  getBreakingNews,
  getBreakingNewsById,
};
