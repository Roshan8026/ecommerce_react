// controllers/authController.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Ensure correct file path and extension
import bcrypt from 'bcrypt';
const axios = 'axios';
const unirest = "unirest";
const nodemailer = "nodemailer";

export const test = async (req, res) => {
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
export const send_otp = async (req, res) => {
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

export const verify_otp = async (req, res) => {
  const { email, otp } = req.body;
  let key = req.body.key ?? null;

  const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid Email Id' });
    } else {
      console.log('existingUser', existingUser?.dataValues.otp);
      if(existingUser?.dataValues.otp == otp) {
        // Update the active column
        await User.update({ active: true }, { where: { email } });
        if(key == "1") {
          return res.status(200).json({ message: 'Password Reset successfully' });
        } else {
          return res.status(200).json({ message: 'User verified and activated successfully' });
        }
      } else {
        return res.status(404).json({ error: 'Otp is Wrong . Please enter correct Otp' });
      }
    }
}
export const reset_password = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid Email Id' });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      let message = "Your Password is reset : " + otp;
      let subject = "Reset Password";
      await sendOtp(email,message,subject)
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Update the active column
      await User.update({ otp: otp , password: hashedPassword}, { where: { email } });

      return res.status(200).json({ message: 'Password Reset Successfully' });
  }
}

// Registration controller
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);
    let message = "This is a test email sent using Testing. This is your otp" + otp;
    let subject = "Hello from Protein";

    await sendOtp(email,message,subject)
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'email Number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ email: email, password: hashedPassword, role: 'client', invitation_code: generateInvitationCode(6), active: 0, otp:otp});

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ "token": token, 'success': "Registered Successfully" });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
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

async function sendOtp(email, message, subject) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "protein19910001@gmail.com",
        pass: "fspzcgigiteouxkl",
      },
    });
    const mailOptions = {
      from: "protein19910001@gmail.com",
      to: email,
      subject: subject,
      text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
}