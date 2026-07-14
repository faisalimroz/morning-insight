const newsService = require('../services/news.service');
const { sendSuccess } = require('../utils/response');

const getNews = async (req, res) => {
  const { page, limit, category, insightCategory, date, search } = req.query;
  const result = await newsService.getNews({
    page,
    limit,
    category,
    insightCategory,
    date,
    search,
  });
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

const createNews = async (req, res) => {
  const news = await newsService.createNews(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'News posted successfully',
    data: news,
  });
};

module.exports = {
  getNews,
  getNewsById,
  getPersonalizedFeed,
  createNews,
};
