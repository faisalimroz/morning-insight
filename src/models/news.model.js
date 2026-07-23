const mongoose = require('mongoose');
const { createContentItemSchema } = require('./schemas/contentItem.schema');

// const newsSchema = createContentItemSchema({
//   defaultCountry: process.env.DEFAULT_COUNTRY || 'Bangladesh',
// });
const newsSchema = createContentItemSchema();
module.exports = mongoose.model('News', newsSchema);
