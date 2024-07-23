// controllers/userController.js
import * as fs from 'fs/promises';
import path from 'path';
import multer from 'multer';
import bcrypt from 'bcrypt';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOADS_FOLDER = 'uploads'; // Folder where uploaded files will be stored

import User from '../models/User.js'; // Ensure correct file path and extension
import BankAccount from '../models/BankAccount.js'; // Ensure correct file path and extension

// first product deactive  ??

export const addBankDetail = async (req, res) => {
  try {
    console.log('addBankDetail')
    const { cardholder_name, bank_name, bank_account, ifsc_code, bank_mobile_number, withdraw_password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(withdraw_password, 10);

    console.log('hashedPassword',hashedPassword);

    const create = await BankAccount.create({
      user_id: req.userId,
      cardholder_name: cardholder_name,
      bank_name: bank_name,
      bank_account: bank_account,
      ifsc_code: ifsc_code,
      bank_mobile_number: bank_mobile_number,
      withdraw_password: withdraw_password
    });

    res.json({ status: 200, Message: "BankAccount created successfully" });
  } catch (error) {
    console.log('error',error);
    res.status(500).json({ error: 'addProductTitle Internal server error' });
  }
};

export const addWithdraw_passwords = async (req, res) => {
  try {
    const { product_title_id, title, price, validity_period, daily_income, total_revenue, total_return, purchase_limit, invitation_bonus, purchase_bonus, lucky_draw } = req.body;

    // const produtc_title = await Product_title.findOne({ where: { id: product_title_id } });
    // console.log('produtc_title', produtc_title);

    // if (!produtc_title) {
    //   return res.status(400).json({ error: 'No product title found' })
    // }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, buffer, mimetype, size } = req.file;

    // Check if the file is a jpeg
    if (mimetype !== 'image/jpeg') {
      return res.status(400).json({ error: 'Uploaded file must be a jpeg' });
    }

    // Check if the file size is less than 5MB
    if (size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: 'File size exceeds the limit of 5MB' });
    }

    await fs.mkdir(UPLOADS_FOLDER, { recursive: true });

    const filename = `${Date.now()}-${originalname}`;
    const filePath = path.join(UPLOADS_FOLDER, filename);

    await fs.writeFile(filePath, buffer);
    console.log('filePath:->  ', filePath);
    // image store in storage 
    const Product = await Products.create({
      product_title_id: product_title_id, img_url: filePath, title: title, price: price,
      validity_period: validity_period, daily_income: daily_income, total_revenue: total_revenue,
      total_return: total_return, purchase_limit: purchase_limit, invitation_bonus: invitation_bonus,
      purchase_bonus: purchase_bonus, lucky_draw: lucky_draw
    });

    res.json({ status: 200, Message: "Product created successfully" });
  } catch (error) {
    console.log('errors:-> ', error);
    res.status(500).json({ error: 'addProducts Internal server error' });
  }
}
export const findProducts = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);
    const Product = await Products.findOne({
      where: { id },
      include: [{
        model: Product_title,
        attributes: ['id', 'title', 'active', 'createdAt', 'updatedAt'], // Specify the attributes to include
      }]
    });
    res.status(201).json({ status: 200, Message: "Products find successfully", data: Product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while creating a post' });
  }
}

export const getProducts = async (req, res) => {
  try {
    // get products details also ??
    const { id } = req.params;
    const Products = await Product_title.findOne({ where: { id: id } });
    if (!Products) {
      return res.status(404).json({ message: 'Products not found' });
    }
    res.status(201).json({ status: 200, Message: "Products find successfully", data: Products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while updating the post' });
  }
}

export const allProduct = async (req, res) => {
  try {
    // get products details also using relationship  ?? 
    const ProductTitle = await Product_title.findAll({ include: Products }); // Use findByPk to find by primary key
    if (!ProductTitle) {
      return res.status(404).json({ message: 'Product_title not found' });
    }
    res.status(201).json({ status: 200, Message: "All Products Fetch successfully", data: ProductTitle });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while deleting the post' });
  }
}

export const createComment = async (req, res) => {
  try {
    const blog_id = req.params.blogId;
    const { comment } = req.body;

    if (comment == null) {
      res.status(500).json({ error: 'comment is cannot be null' });
    }

    // Create the comment
    const blog_comment = await Comment.create({
      comment,
      blog_id,
      userId: req.userId,
    });

    res.status(201).json(blog_comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the comment.' });
  }
}

export const listComment = async (req, res) => {
  try {
    const Comments = await Comment.findAll({ where: { blog_id: req.params.blogId } });
    res.json(Comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching comments' });
  }
}
