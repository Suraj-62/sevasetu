const express = require('express');
const { getPendingUsers, approveUser, rejectUser, getAllUsers, blockUser, deleteUser, updateUser } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/pending-users', protect, admin, getPendingUsers);
router.put('/approve-user/:id', protect, admin, approveUser);
router.put('/reject-user/:id', protect, admin, rejectUser);

router.get('/all-users', protect, admin, getAllUsers);
router.put('/block-user/:id', protect, admin, blockUser);
router.delete('/delete-user/:id', protect, admin, deleteUser);
router.put('/update-user/:id', protect, admin, updateUser);

module.exports = router;
