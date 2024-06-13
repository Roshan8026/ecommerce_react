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
    await queryInterface.createTable('bank_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cardholder_name: {
        type: DataTypes.STRING, // Use DataTypes.STRING instead of just STRING
        allowNull: true,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bank_account: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ifsc_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bank_mobile_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      withdraw_password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('bank_accounts');
  }
};
