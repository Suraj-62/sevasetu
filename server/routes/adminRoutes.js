const express = require('express');
const { getPendingUsers, approveUser, rejectUser, getAllUsers, blockUser, deleteUser, updateUser } = require('../controllers/adminController');
const router = express.Router();

router.get('/pending-users', getPendingUsers);
router.put('/approve-user/:id', approveUser);
router.put('/reject-user/:id', rejectUser);

router.get('/all-users', getAllUsers);
router.put('/block-user/:id', blockUser);
router.delete('/delete-user/:id', deleteUser);
router.put('/update-user/:id', updateUser);

module.exports = router;
