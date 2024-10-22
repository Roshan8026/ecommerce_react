'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {  // Use 'orders' as the table name
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // Assumes you have a 'users' table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',  // Assumes you have a 'products' table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      completed_validity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('completed', 'Not Completed'),  // Enum type with 2 values
        allowNull: false,
        defaultValue: 'Not Completed',
      },
      previous_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      after_balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');  // Dropping the 'orders' table if rolled back
  },
};
