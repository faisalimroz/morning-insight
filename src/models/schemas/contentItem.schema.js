const mongoose = require('mongoose');

/**
 * Shared schema for News, TrendingNews, BreakingNews, and Tender collections.
 */
// const createContentItemSchema = (options = {}) => {
//   const { defaultCountry = 'Bangladesh' } = options;

//   const schema = new mongoose.Schema(
//     {
//       title: { type: String, required: true, trim: true },
//       description: { type: String, trim: true },
//       content: { type: String, required: true },
//       date: { type: Date, default: Date.now, index: true },
//       source: { type: String, trim: true },
//       category: { type: String, required: true, trim: true, index: true },
//       insightCategory: { type: String, required: true, trim: true, index: true },
//       keywords: [{ type: String, trim: true }],
//       image: { type: String },
//       author: { type: String, trim: true },
//       views: { type: Number, default: 0 },
//       country: {
//         type: String,
//         required: true,
//         trim: true,
//         default: defaultCountry,
//         index: true,
//       },
//       createdAt: { type: Date, default: Date.now, index: true },
//     },
//     { timestamps: { createdAt: false, updatedAt: true } },
//   );

//   schema.index({ country: 1, createdAt: -1 });
//   schema.index({ country: 1, date: -1 });
//   schema.index({ country: 1, category: 1, createdAt: -1 });
//   schema.index({ views: -1 });

//   return schema;
// };
const createContentItemSchema = () => {
  const schema = new mongoose.Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, trim: true },
      content: { type: String, required: true },
      date: { type: Date, default: Date.now, index: true },
      source: { type: String, trim: true },
      category: { type: String, required: true, trim: true, index: true },
      insightCategory: { type: String, required: true, trim: true, index: true },
      keywords: [{ type: String, trim: true }],
      image: { type: String },
      author: { type: String, trim: true },
      views: { type: Number, default: 0 },
      country: {
        type: String,
        required: true,
        trim: true,
        index: true,
        // No default value
      },
      createdAt: { type: Date, default: Date.now, index: true },
    },
    { timestamps: { createdAt: false, updatedAt: true } },
  );

  schema.index({ country: 1, createdAt: -1 });
  schema.index({ country: 1, date: -1 });
  schema.index({ country: 1, category: 1, createdAt: -1 });
  schema.index({ views: -1 });

  return schema;
};
module.exports = { createContentItemSchema };
