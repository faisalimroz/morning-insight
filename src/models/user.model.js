const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String }, // Optional to allow OAuth users, enforced in local registration service
    picture: { type: String },
    address: { type: String },
    interests: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.length <= 5;
        },
        message: 'Interests cannot exceed 5 items'
      },
      default: []
    },
    provider: { type: String, default: 'local' },
    providerId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
