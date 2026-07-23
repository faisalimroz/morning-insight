const mongoose = require('mongoose');
const { createContentItemSchema } = require('./schemas/contentItem.schema');

// const breakingNewsSchema = createContentItemSchema({
//   defaultCountry: process.env.DEFAULT_COUNTRY || 'Bangladesh',
// });
const breakingNewsSchema = createContentItemSchema();
module.exports = mongoose.model('BreakingNews', breakingNewsSchema, 'breakingnews');
