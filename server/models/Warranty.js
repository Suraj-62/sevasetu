const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'voided'],
    default: 'active',
  },
  serviceHistory: [{
    serviceDate: Date,
    issue: String,
    resolution: String,
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Warranty', warrantySchema);
