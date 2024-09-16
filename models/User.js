// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Blog from './Product_title.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
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
  userId: {
    type: DataTypes.INTEGER,
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
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
  }, {
  // Enable timestamps
  timestamps: true,
  // Use underscored format for column names (e.g., created_at, updated_at)
  // underscored: true,
});

User.hasMany(Blog, { foreignKey: 'userId' });

export default User;