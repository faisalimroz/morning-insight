const News = require('../models/news.model');
const AppError = require('../utils/AppError');
const { createContentService } = require('./contentItem.service');

const baseService = createContentService(News, 'News article');

const getPersonalizedFeed = async (userId) => {
  const User = require('../models/user.model');
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);

  const interests = user.interests || [];
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  return News.find({
    category: { $in: interests },
    date: { $gte: startOfToday, $lt: startOfTomorrow },
  }).sort({ date: -1, createdAt: -1 });
};

module.exports = {
  getNews: baseService.getAll,
  getNewsById: baseService.getById,
  createNews: baseService.create,
  updateNews: baseService.update,
  deleteNews: baseService.remove,
  getPersonalizedFeed,
};
