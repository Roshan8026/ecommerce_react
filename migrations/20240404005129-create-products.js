'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('products');
  }
};
