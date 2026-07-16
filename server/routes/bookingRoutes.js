const express = require('express');
const { createBooking, getMyBookings, getTechnicianBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, technician } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getMyBookings);

router.route('/technician')
  .get(protect, technician, getTechnicianBookings);

router.route('/:id/status')
  .put(protect, updateBookingStatus);

module.exports = router;
