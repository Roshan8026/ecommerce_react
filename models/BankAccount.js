// models/Blog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const products = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cardholder_name: {
    type: DataTypes.STRING, // Use DataTypes.STRING instead of just STRING
    allowNull: true,
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bank_account: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ifsc_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bank_mobile_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  withdraw_password: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

// Blog.belongsTo(User, { foreignKey: 'userId' });


module.exports = products;