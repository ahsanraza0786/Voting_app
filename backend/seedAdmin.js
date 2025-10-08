// Seed script to create an admin user if none exists
// Usage (from project root):
//   node backend/seedAdmin.js

const mongoose = require('mongoose');
const db = require('./db');
const User = require('./models/user');

async function seedAdmin() {
  try {
    // Ensure DB connection is ready
    if (mongoose.connection.readyState !== 1) {
      // Wait briefly for connection established
      await new Promise((resolve, reject) => {
        db.once('open', resolve);
        db.once('error', reject);
        setTimeout(resolve, 2000);
      });
    }

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.aadharCardNumber);
      process.exit(0);
    }

    const adminData = {
      name: 'Ahsan Khan',
      age: 22,
      email: 'ahsan1234@gmail.com',
      mobile: 'si di',
      address: 'it',
      aadharCardNumber: '333322221111',
      password: 'Admin@123',
      role: 'admin'
    };

    const adminUser = new User(adminData);
    const saved = await adminUser.save();
    console.log('Admin user created:', saved.aadharCardNumber, 'ID:', saved._id.toString());
    console.log('Default admin password:', adminData.password);
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed admin:', err);
    process.exit(1);
  }
}

seedAdmin();
