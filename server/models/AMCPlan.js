const mongoose = require('mongoose');

const amcPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    enum: ['silver', 'gold', 'premium'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  durationMonths: {
    type: Number,
    default: 12,
  },
  includedServices: [{
    type: String
  }],
  totalVisits: {
    type: Number,
    default: 1, // e.g., 2 free services per year
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('AMCPlan', amcPlanSchema);
