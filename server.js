// server.js

const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('./config/database');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('./models/User');
// const Blog = require('./models/Blog');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const path = require('path');
const nodemailer = require("nodemailer");
const BankController = require('./controllers/BankController');


const app = express();
const cors = require("cors")

app.use(cors({
  credentials: true
}));
app.use(express.json());

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Failed to synchronize models:', error);
  });



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

//checking node js 
app.get('test', authController.test);

// Registration route
app.post('/api/send-otp', authController.send_otp);
app.get('/api/verify_otp',authController.verify_otp);
app.post('/api/register', upload.none(), authController.register);
app.post('/api/login', upload.none(), authController.login);
app.post('/api/reset_password', authController.reset_password);

// all route
app.post('/api/product-title',verifyToken,  upload.none(), productController.addProductTitle);
app.post('/api/product-add',verifyToken, upload.single('file'), productController.addProducts);
app.get('/api/product_details/:id', verifyToken, productController.findProducts);
app.get('/api/all_title_products', verifyToken, productController.allProduct);
app.post('/api/bank-add', verifyToken, upload.none(), BankController.addBankDetail)

// Login route

// User route
app.get('/users', verifyToken, userController.getUser);

//Crud Operation performe on BlogPosts

// app.get('/post', verifyToken, userController.getBlog);

// app.post('/post', verifyToken, upload.none(), userController.postBlog);


// app.put('/posts/:id', verifyToken, upload.none(), userController.updateBlog);


// app.delete('/posts/:id', verifyToken, userController.deleteBlog);


// // comments

// app.post('/posts/:blogId/comments', verifyToken, upload.none(), userController.createComment);

// //List comment for specific blog

// app.get('/posts/:blogId', verifyToken, userController.listComment);



app.listen(3000, () => {
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
  console.log('Server running on port 3000');
});