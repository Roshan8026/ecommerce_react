// models/Blog.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
// const Products = require('./Products');

const Product_title = sequelize.define('product_title', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN, // Use DataTypes.STRING instead of just STRING
    allowNull: false,
  },
});

// Product_title.hasMany(Products, { foreignKey: 'product_title_id' });


export default Product_title;