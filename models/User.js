// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Blog = require('./Product_title');

const User = sequelize.define('User', {
  mobile_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  invitation_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Blog, { foreignKey: 'userId' });

module.exports = User;