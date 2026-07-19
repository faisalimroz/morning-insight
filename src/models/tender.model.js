const mongoose = require('mongoose');
const { createContentItemSchema } = require('./schemas/contentItem.schema');

const tenderSchema = createContentItemSchema({
  defaultCountry: process.env.DEFAULT_COUNTRY || 'Bangladesh',
});

module.exports = mongoose.model('Tender', tenderSchema, 'tenders');
