// Promote or create admin user script
// Usage: node backend/promoteAdmin.js

const mongoose = require('mongoose');
const db = require('./db');
const User = require('./models/user');

async function run() {
  try {
    // Wait for DB connection
    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve, reject) => {
        db.once('open', resolve);
        db.once('error', reject);
        setTimeout(resolve, 2000);
      });
    }

    const aadharStr = '333322221111';
    const aadharNum = Number(aadharStr);

    let user = null;
    // Try find by string or number
    user = await User.findOne({ aadharCardNumber: aadharStr });
    if (!user) user = await User.findOne({ aadharCardNumber: aadharNum });

    if (user) {
      user.role = 'admin';
      const saved = await user.save();
      console.log('Promoted existing user to admin:', saved.aadharCardNumber.toString());
      process.exit(0);
    }

    // Create new admin user
    const adminData = {
      name: 'Ahsan Khan',
      age: 22,
      email: 'ahsan1234@gmail.com',
      mobile: 'si di',
      address: 'it',
      aadharCardNumber: aadharStr,
      password: 'Admin@123',
      role: 'admin'
    };

    const newUser = new User(adminData);
    const saved = await newUser.save();
    console.log('Created new admin user:', saved.aadharCardNumber.toString(), 'ID:', saved._id.toString());
    console.log('Default password:', adminData.password);
    process.exit(0);
  } catch (err) {
    console.error('Error promoting/creating admin:', err);
    process.exit(1);
  }
}

run();
