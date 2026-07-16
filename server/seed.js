require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    // Check if user already exists
    const existingAdmin = await User.findOne({ email: 'Mishra@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists. Updating password.');
      existingAdmin.password = '629932'; // Pre-save hook will hash it
      await existingAdmin.save();
    } else {
      const adminUser = new User({
        name: 'Super Admin',
        email: 'Mishra@gmail.com',
        password: '629932',
        role: 'admin',
        isVerified: true
      });
      await adminUser.save();
      console.log('Admin user seeded successfully.');
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
