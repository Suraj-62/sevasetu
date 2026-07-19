const express = require('express');
const { createBooking, getMyBookings, getTechnicianBookings, updateBookingStatus, getPendingBookings, acceptBooking } = require('../controllers/bookingController');
const { protect, technician } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getMyBookings);

router.route('/technician')
  .get(protect, technician, getTechnicianBookings);

router.route('/pending')
  .get(protect, technician, getPendingBookings);

router.route('/:id/status')
  .put(protect, updateBookingStatus);

router.route('/:id/accept')
  .put(protect, technician, acceptBooking);

module.exports = router;
