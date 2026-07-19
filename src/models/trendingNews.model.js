const mongoose = require('mongoose');
const { createContentItemSchema } = require('./schemas/contentItem.schema');

const trendingNewsSchema = createContentItemSchema({
  defaultCountry: process.env.DEFAULT_COUNTRY || 'Bangladesh',
});

module.exports = mongoose.model('TrendingNews', trendingNewsSchema, 'trendingnews');
