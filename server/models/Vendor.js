const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  businessLicense: {
    type: String, // URL to document
  },
  panCard: {
    type: String,
  },
  shopAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  businessCategory: {
    type: String,
    required: true,
  },
  shopLogo: {
    type: String, // URL
  },
  coverImage: {
    type: String, // URL
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
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

module.exports = mongoose.model('Vendor', vendorSchema);
