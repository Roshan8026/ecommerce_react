// server.js
import Razorpay from 'razorpay';
import { checkout, paymentVerification } from './controllers/paymentController.js';
import express from 'express';
import { Op } from 'sequelize';
import sequelize from './config/database.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
// import User from './models/User.js';
// import Blog from './models/Blog.js'; // You can uncomment this if needed
import * as authController from './controllers/authController.js';
import  * as userController from './controllers/userController.js';
import  * as productController from './controllers/productController.js';
import path from 'path';
import nodemailer from 'nodemailer';
import * as BankController from './controllers/BankController.js';

// Load environment variables from .env file
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('check object RAZORPAY_API_KEY', process.env.RAZORPAY_API_KEY)
    console.log('check object RAZORPAY_APT_SECRET', process.env.RAZORPAY_APT_SECRET)
    console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Failed to synchronize models:', error);
  });

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export default instance; 

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for handling form data
const upload = multer();

// Registration route
app.post('/api/send-otp', authController.send_otp);
app.get('/api/verify_otp', authController.verify_otp);
app.post('/api/register', upload.none(), authController.register);
app.post('/api/login', upload.none(), authController.login);
app.post('/api/reset_password', authController.reset_password);

// all route
app.post('/api/product-title', verifyToken, upload.none(), productController.addProductTitle);
app.post('/api/product-add', verifyToken, upload.single('file'), productController.addProducts);
app.get('/api/product_details/:id', verifyToken, productController.findProducts);
app.get('/api/all_title_products', verifyToken, productController.allProduct);
app.post('/api/bank-add', verifyToken, upload.none(), BankController.addBankDetail);
app.post('/api/payment_checkout', verifyToken, upload.none(), checkout);
app.post('/api/payment_paymentverification', verifyToken, upload.none(), BankController.addBankDetail);

// User route
app.get('/users', verifyToken, userController.getUser);

app.listen(PORT, () => {
  // const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "protein19910001@gmail.com",
  //     pass: "fspzcgigiteouxkl",
  //   },
  // });
  // const mailOptions = {
  //   from: "protein19910001@gmail.com",
  //   to: "abdulkayum0912@gmail.com",
  //   subject: "Hello from Protein",
  //   text: "This is a test email sent using Testing .",
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error("Error sending email: ", error);
  //   } else {
  //     console.log("Email sent: ", info.response);
  //   }
  // });
  console.log(`Server running on port ${PORT}`);
});
