const newsService = require('../services/news.service');
const { sendSuccess } = require('../utils/response');
const { listQuerySchema, validate } = require('../validators/contentItem.validator');

const getNews = async (req, res) => {
  const filters = validate(listQuerySchema, req.query);
  const result = await newsService.getNews(filters);
  return sendSuccess(res, {
    message: 'News fetched successfully',
    data: result,
  });
};

const getNewsById = async (req, res) => {
  const news = await newsService.getNewsById(req.params.id, true);
  return sendSuccess(res, {
    message: 'News fetched successfully',
    data: news,
  });
};

const getPersonalizedFeed = async (req, res) => {
  const news = await newsService.getPersonalizedFeed(req.user.id);
  return sendSuccess(res, {
    message: 'Personalized news feed fetched successfully',
    data: news,
  });
};

module.exports = {
  getNews,
  getNewsById,
  getPersonalizedFeed,
};
