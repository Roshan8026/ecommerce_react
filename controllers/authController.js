// controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const axios = require('axios');
const unirest = require("unirest");

exports.test = async (req, res) => {
  return res.status(200).json({ message: 'This is url is working ' });

}
function generateInvitationCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// console.log(generateInvitationCode(6));

exports.send_otp = async (req, res) => {
  try {
    const mobileNumber = req.body.mobileNumber;
    console.log('mobileNumber', mobileNumber);
    const otp = Math.floor(100000 + Math.random() * 900000);
    // const response = await axios.get('https://www.fast2sms.com/dev/bulk', {
    //   params: {
    //     authorization: "NxBGeX3zQMysga4icb01w8YFCluvj2UJh9dDVWqIPmE6LAnRfpCDBkrK6fmYLndlAiJXxOpFqE8WZIRs",
    //     sender_id: "FSTSMS",
    //     message: `Your OTP is ${otp}`, // Include message text here
    //     route: 'otp', // Use 'otp' as the route parameter
    //     numbers: mobileNumber,
    //     language: 'english' // Add the language parameter here
    //   }
    // });
    const reque = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

    reque.query({
      "authorization": "NxBGeX3zQMysga4icb01w8YFCluvj2UJh9dDVWqIPmE6LAnRfpCDBkrK6fmYLndlAiJXxOpFqE8WZIRs",
      "variables_values": "5599",
      "route": "otp",
      "numbers": "8053818026",
    });

    reque.headers({
      "cache-control": "no-cache"
    });

    reque.end(function (res) {
      if (res.error) {
        console.error(res.error);
        throw new Error(res.error.message); // Throw an error if there's a problem
      }

      console.log(res.body);
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP.' });
  }
}

// Assuming you have an array or database to store the generated OTPs for each user
const otpStore = {};

exports.verify_otp = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  // Check if the mobile number exists in the OTP store
  if (otpStore.hasOwnProperty(mobileNumber)) {
    // Get the stored OTP and its expiration time
    const { storedOTP, expirationTime } = otpStore[mobileNumber];

    // Verify the OTP and check if it's not expired
    if (storedOTP === otp && Date.now() < expirationTime) {
      // OTP verification successful
      res.json({ success: true, message: 'OTP verification successful!' });
    } else {
      // Invalid OTP or expired OTP
      res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }
  } else {
    // Mobile number not found or OTP expired
    res.status(400).json({ success: false, message: 'Mobile number not found or OTP expired.' });
  }
}

// Registration controller
exports.register = async (req, res) => {
  try {
    const { mobile_number, password } = req.body;

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ where: { mobile_number } });
    if (existingUser) {
      return res.status(400).json({ error: 'Mobile Number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ mobile_number: mobile_number, password: hashedPassword, role: 'client', invitation_code: generateInvitationCode(6) });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ "token": token, 'success': "Registered Successfully" });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { mobile_number, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { mobile_number } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ "token": token, 'success': "Login Successfully", 'user': user });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
