// controllers/signupController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const uuid = require('uuid');
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com.au',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'oldphonedeals.group05@zohomail.com.au',
        pass: 'LypNzg79mqvb'
    }
  });

// Sign-up route handler
const signUp = async (req, res) => {
// res.json({ message: 'Success' });

  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Generate a unique verification token
    const verificationToken = uuid.v4();
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      verificationToken,    
    });

    // Save the user to the database
    await user.save()
        .then((savedUser) => {
            console.log('savedUser', savedUser)
        });


    // Send the verification email with the verificationToken
    const mailOptions = {
        from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:3000/verify?token=${verificationToken}`,
    };
  
    await transporter.sendMail(mailOptions);


    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signUp };