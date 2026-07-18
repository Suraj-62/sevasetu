const express = require('express');
const { createOrder, getMyOrders, getVendorOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, vendor } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.route('/vendor')
  .get(protect, vendor, getVendorOrders);

router.route('/:id/status')
  .put(protect, vendor, updateOrderStatus);

module.exports = router;
