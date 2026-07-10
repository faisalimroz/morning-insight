const News = require('../models/news.model');
const User = require('../models/user.model');
const AppError = require('../utils/AppError');

const getNews = async (category) => {
  const query = {};
  if (category) {
    query.category = category;
  }
  return News.find(query).sort({ createdAt: -1 });
};

const getPersonalizedFeed = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const interests = user.interests || [];
  return News.find({ category: { $in: interests } }).sort({ createdAt: -1 });
};

module.exports = {
  getNews,
  getPersonalizedFeed,
};
