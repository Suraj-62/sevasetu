const Booking = require('../models/Booking');

// Create new booking
const createBooking = async (req, res) => {
  try {
    const { service, address, scheduledDate, timeSlot, totalAmount, notes } = req.body;

    const booking = new Booking({
      customer: req.user._id,
      service,
      address,
      scheduledDate,
      timeSlot,
      totalAmount,
      notes,
      otp: Math.floor(1000 + Math.random() * 9000).toString(), // 4 digit OTP
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in user bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for a technician
const getTechnicianBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ technician: req.user._id }).populate('customer', 'name phone');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getTechnicianBookings,
  updateBookingStatus
};
