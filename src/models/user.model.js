const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
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
    provider: { type: String },
    providerId: { type: String },
    url: { type: String, default: '' },
    origin: { type: String, default: '' },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });
userSchema.index({ origin: 1 });

module.exports = mongoose.model('User', userSchema);
