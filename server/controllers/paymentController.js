const crypto = require('crypto');
const Booking = require('../models/Booking');

// Mock Razorpay Order Creation
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    
    // In a real app, you would call razorpay.orders.create()
    const mockOrder = {
      id: `order_${crypto.randomBytes(8).toString('hex')}`,
      entity: "order",
      amount: amount * 100, // paise
      amount_paid: 0,
      amount_due: amount * 100,
      currency: "INR",
      receipt: `receipt_${crypto.randomBytes(4).toString('hex')}`,
      status: "created",
    };

    res.json(mockOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mock Razorpay Verification
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    // In a real app, you would verify the signature using crypto.createHmac and process.env.RAZORPAY_KEY_SECRET
    
    // Mock successful verification
    const booking = await Booking.findById(bookingId);
    if (booking) {
      booking.paymentStatus = 'paid';
      booking.paymentId = razorpay_payment_id;
      booking.status = 'accepted'; // Auto accept for mock purposes
      await booking.save();
      
      res.json({ success: true, message: 'Payment verified successfully', booking });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, verifyPayment };
