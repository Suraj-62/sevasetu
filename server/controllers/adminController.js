const User = require('../models/User');

const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' }).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error.stack); res.status(500).json({ message: error.message });
  }
};

const { sendApprovalEmail } = require('../utils/emailService');

const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.status = 'approved';
    await user.save();
    
    // Send Approval Email (Do not await so it sends in background)
    sendApprovalEmail(user.email, user.name);
    
    res.json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.status = 'rejected';
    await user.save();
    res.json({ message: 'User rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Toggle block status
    user.status = user.status === 'blocked' ? 'approved' : 'blocked';
    await user.save();
    res.json({ message: `User ${user.status === 'blocked' ? 'blocked' : 'unblocked'} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    
    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPendingUsers, approveUser, rejectUser, getAllUsers, blockUser, deleteUser, updateUser };
