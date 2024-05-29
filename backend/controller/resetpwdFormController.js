const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid reset token' });
    }

    // Hash the new password and save it to the user
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.checkToken = async (req, res) => {
  const { token } = req.params;
    try {
      const user = await User.findOne({ resetPasswordToken: token });
        if (!user) {
            return res.json({ success: false, message: 'Invalid reset token' });
        }
        res.json({ success: true, message: 'Token is valid' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}