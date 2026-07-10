const Bookmark = require('../models/bookmark.model');
const News = require('../models/news.model');
const AppError = require('../utils/AppError');

const addBookmark = async (userId, newsId) => {
  if (!newsId) {
    throw new AppError('News ID is required', 400);
  }

  const newsExists = await News.findById(newsId);
  if (!newsExists) {
    throw new AppError('News article not found', 404);
  }

  try {
    const bookmark = await Bookmark.create({ userId, newsId });
    return bookmark;
  } catch (err) {
    if (err.code === 11000) {
      throw new AppError('Article is already bookmarked', 409);
    }
    throw err;
  }
};

const removeBookmark = async (userId, newsId) => {
  if (!newsId) {
    throw new AppError('News ID is required', 400);
  }

  const bookmark = await Bookmark.findOneAndDelete({ userId, newsId });
  if (!bookmark) {
    throw new AppError('Bookmark not found', 404);
  }
  return bookmark;
};

const getBookmarks = async (userId) => {
  const bookmarks = await Bookmark.find({ userId }).populate('newsId');
  return bookmarks;
};

module.exports = {
  addBookmark,
  removeBookmark,
  getBookmarks,
};
