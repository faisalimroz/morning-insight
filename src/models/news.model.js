const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    author: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: { createdAt: false, updatedAt: true } } 
);

module.exports = mongoose.model('News', newsSchema);
