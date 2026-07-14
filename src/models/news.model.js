const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    insightCategory: { type: String, required: true },
    image: { type: String },
    author: { type: String },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

newsSchema.index({ category: 1 });
newsSchema.index({ insightCategory: 1 });
newsSchema.index({ views: -1 });
newsSchema.index({ createdAt: -1 });

module.exports = mongoose.model('News', newsSchema);
