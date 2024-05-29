// Import the required modules
const express = require('express');
const User = require('../models/User');

// Create an Express router
const router = express.Router();

// Verification route
router.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user with the matching verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    // Update the isVerified field to true
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({ success: true });
  } catch (error) {
      console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;