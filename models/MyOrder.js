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
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cycle: {
    type: DataTypes.STRING, // Use DataTypes.STRING instead of just STRING
    allowNull: false,
  },
  income: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

// Blog.belongsTo(User, { foreignKey: 'userId' });


module.exports = products;