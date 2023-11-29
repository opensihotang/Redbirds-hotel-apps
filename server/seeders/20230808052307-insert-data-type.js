'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Types", [
      {
        name : "Apartment",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Hotel",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Wisma",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Types", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
