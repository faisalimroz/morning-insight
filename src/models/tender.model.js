const mongoose = require('mongoose');
const { createContentItemSchema } = require('./schemas/contentItem.schema');

// const tenderSchema = createContentItemSchema({
//   defaultCountry: process.env.DEFAULT_COUNTRY || 'Bangladesh',
// });
const tenderSchema = createContentItemSchema();
module.exports = mongoose.model('Tender', tenderSchema, 'tenders');
