// for signup page
// controllers/signinController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Sign-in route handler
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.email }, 'Justins-secret-key', {
      expiresIn: '24h',
    });

    // Send the token in the response
    res.json({ success: true, token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { signIn };