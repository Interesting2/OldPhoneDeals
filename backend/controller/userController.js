const User = require('../models/User');
const jwt = require('jsonwebtoken');
const PhoneListing = require('../models/PhoneListing');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com.au',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'oldphonedeals.group05@zohomail.com.au',
    pass: 'LypNzg79mqvb'
  }
});

exports.getProfile = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
    const user = await User.findOne({ email: decoded.userId }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');

    // Retrieve the user from the database
    const user = await User.findOne({ email: decoded.userId });

    // Check if the provided password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    // Update the user profile
    const updatedUser = await User.findOneAndUpdate(
        { email: decoded.userId },
        { $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email } },
        { new: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePwd = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
    const user = await User.findOne({ email: decoded.userId });

    const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();

    // Send the verification email with the verificationToken
    const mailOptions = {
      from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
      to: user.email,
      subject: 'You have changed your password',
      text: `Receiving this email means that you have changed your password.`,
    };

    await transporter.sendMail(mailOptions);


    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyToken = async (req, res) => {
  const token = req.body.token;
  // Verify the token using JWT library
  try {
    const decoded = jwt.verify(token, 'Justins-secret-key');
    // Token is valid, send a success response
    const user = await User.findOne({ email: decoded.userId });

    if (user) {

      res.status(200).json({ _id: user._id});
    } else {
      res.sendStatus(401);
    }
    
  } catch (error) {
    res.sendStatus(401);
  }
};

exports.getUserComments = async (req, res) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], 'Justins-secret-key');
    const user = await User.findOne({ email: decoded.userId });
    const listings = await PhoneListing.find({ seller: user._id }).lean();
    const comments = listings.map(listing => ({ title: listing.title, comments: listing.reviews, _id: listing._id}));
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCommentVisibility = async (req, res) => {
  try {
    const { listingId, reviewId, hidden } = req.body;
    const listing = await PhoneListing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const review = listing.reviews[reviewId];
    console.log(review)
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.hidden = hidden;

    await listing.save();

    res.status(200).json({ message: 'Review visibility updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
