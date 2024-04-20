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
    allowNull: false,
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank_account: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ifsc_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bank_mobile_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  withdraw_password: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Blog.belongsTo(User, { foreignKey: 'userId' });


module.exports = products;