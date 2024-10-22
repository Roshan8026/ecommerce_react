// models/Blog.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const My_Details = sequelize.define('product_title', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    recharge: {
    type: DataTypes.INTEGER, // Use DataTypes.STRING instead of just STRING
    allowNull: false,
    },
    balance: {
    type: DataTypes.INTEGER, // Use DataTypes.STRING instead of just STRING
    allowNull: false,
    },
    total_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    total_recharge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    total_asset: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    total_withdraw: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    todays_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    team_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
    }
});

My_Details.belongsTo(User, { foreignKey: 'user_Id' });

export default My_Details;