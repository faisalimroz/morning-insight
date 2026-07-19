const trendingNewsService = require('../services/trendingNews.service');
const { sendSuccess } = require('../utils/response');
const { listQuerySchema, validate } = require('../validators/contentItem.validator');

const getTrendingNews = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await trendingNewsService.getTrendingNews(filters);
  return sendSuccess(res, {
    message: 'Trending news fetched successfully',
    data: result,
  });
};

const getTrendingNewsById = async (req, res) => {
  const item = await trendingNewsService.getTrendingNewsById(req.params.id, true);
  return sendSuccess(res, {
    message: 'Trending news fetched successfully',
    data: item,
  });
};

module.exports = {
  getTrendingNews,
  getTrendingNewsById,
};
