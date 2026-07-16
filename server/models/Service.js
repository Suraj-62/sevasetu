const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  estimatedTime: {
    type: String, // e.g., '1-2 hours'
  },
  includes: [{
    type: String,
  }],
  excludes: [{
    type: String,
  }],
  image: {
    type: String, // URL
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
