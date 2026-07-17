const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, vendor } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, vendor, createProduct); // Protected for vendors and admins

router.route('/:id')
  .get(getProductById);

module.exports = router;
