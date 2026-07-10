const bookmarkService = require('../services/bookmark.service');
const { sendSuccess } = require('../utils/response');

const addBookmark = async (req, res) => {
  const { newsId } = req.body;
  const bookmark = await bookmarkService.addBookmark(req.user.id, newsId);
  return sendSuccess(res, {
    statusCode: 201,
    message: 'Bookmark added successfully',
    data: bookmark,
  });
};

const removeBookmark = async (req, res) => {
  const { newsId } = req.params;
  await bookmarkService.removeBookmark(req.user.id, newsId);
  return sendSuccess(res, {
    message: 'Bookmark removed successfully',
  });
};

const getBookmarks = async (req, res) => {
  const bookmarks = await bookmarkService.getBookmarks(req.user.id);
  return sendSuccess(res, {
    message: 'Bookmarks fetched successfully',
    data: bookmarks,
  });
};

module.exports = {
  addBookmark,
  removeBookmark,
  getBookmarks,
};
