// models/Blog.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const product_title = sequelize.define('product_title', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN, // Use DataTypes.STRING instead of just STRING
    allowNull: false,
  },
});

// Blog.belongsTo(User, { foreignKey: 'userId' });


module.exports = product_title;