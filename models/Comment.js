// models/Blog.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Comment = sequelize.define('comments', {
    comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blog_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parent_comment_id: {
    type: DataTypes.INTEGER,
    allowNull: null,
  },
});


export default Comment;