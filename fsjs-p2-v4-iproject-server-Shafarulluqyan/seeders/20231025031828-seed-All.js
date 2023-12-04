"use strict";
const { hashPass } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customer = require("../customer.json");
    customer.forEach((el) => {
      delete el.id;
      el.password = hashPass(el.password);
      el.createdAt = el.updatedAt = new Date();
    });
    const food = require("../foods.json");
    food.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    const cart = require("../cart.json");
    cart.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Customers", customer);
    await queryInterface.bulkInsert("Foods", food);
    await queryInterface.bulkInsert("Carts", cart);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Customers", null);
    await queryInterface.bulkDelete("Foods", null);
    await queryInterface.bulkDelete("Carts", null);
  },
};
