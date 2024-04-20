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
  product_title_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING, // Use DataTypes.STRING instead of just STRING
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING, // Use DataTypes.STRING instead of just STRING
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  validity_period: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  daily_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_revenue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_return: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchase_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  invitation_bonus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  purchase_bonus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lucky_draw: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Blog.belongsTo(User, { foreignKey: 'userId' });


module.exports = products;