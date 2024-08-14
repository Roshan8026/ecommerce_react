// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Payment = sequelize.define('payments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  razorpay_order_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razorpay_payment_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razorpay_signature: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  }, {
  // Enable timestamps
  timestamps: true,
  // Use underscored format for column names (e.g., created_at, updated_at)
  // underscored: true,
});

export default Payment;