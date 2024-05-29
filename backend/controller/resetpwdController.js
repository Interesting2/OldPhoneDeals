const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const requestReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found or not verified' });
    }

    const resetToken = uuidv4();

    user.resetPasswordToken = resetToken;
    await user.save();

    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com.au',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'oldphonedeals.group05@zohomail.com.au',
            pass: 'LypNzg79mqvb'
        }
      });
    const mailOptions = {
      from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email', err);
        return res.status(500).json({ success: false, message: 'Error sending email' });
      }
      res.json({ success: true, message: 'Reset link sent to email' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};






module.exports = { requestReset };
