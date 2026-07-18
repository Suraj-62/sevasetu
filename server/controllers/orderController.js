const Order = require('../models/Order');

// Create new order
const createOrder = async (req, res) => {
  try {
    const { vendor, items, shippingAddress, totalAmount } = req.body;

    const order = new Order({
      customer: req.user._id,
      vendor,
      items,
      shippingAddress,
      totalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in customer's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vendor's incoming orders
const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('customer', 'name phone').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (for vendor)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      // Allow any vendor to update for demo purposes

      order.orderStatus = status || order.orderStatus;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus
};
