// models/Blog.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('product_title', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    product_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    completed_validity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    status: {
    type: DataTypes.ENUM('completed', 'Not Completed'),
    allowNull: false,
    defaultValue: 'Not Completed',
    },
    previous_balance: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    },
    after_balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    }
});

Order.belongsTo(Products, { foreignKey: 'user_Id' });

export default Order;