const newsService = require('../services/news.service');
const { sendSuccess } = require('../utils/response');

const getNews = async (req, res) => {
  const { category } = req.query;
  const news = await newsService.getNews(category);
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
  getPersonalizedFeed,
};
