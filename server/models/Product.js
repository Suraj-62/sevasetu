const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specifications: [{
    key: String,
    value: String
  }],
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number, // Percentage
    default: 0,
  },
  images: [{
    type: String // URLs
  }],
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  deliveryTimeDays: {
    type: Number,
    default: 3,
  },
  warrantyMonths: {
    type: Number,
    default: 12,
  },
  installationAvailable: {
    type: Boolean,
    default: false,
  },
  installationCharges: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
