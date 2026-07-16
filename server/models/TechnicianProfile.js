const mongoose = require('mongoose');

const technicianProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  experienceYears: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  documents: [{
    name: String,
    url: String, // URL to document (Aadhaar, Certification, etc)
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },
  totalEarnings: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

technicianProfileSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('TechnicianProfile', technicianProfileSchema);
