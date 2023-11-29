'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username : "surya",
        email : "suryainsomnia@gmail.com",
        password : "1234asdf",
        role : "Admin",
        phoneNumber : "0898989808",
        address : "jl. Tegal",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        username : "Bulan",
        email : "bulanbegadang@gmail.com",
        password : "1234asdf",
        role : "Staff",
        phoneNumber : "0898989808",
        address : "jl. Tasikmalaya",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
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
    await queryInterface.bulkDelete("Users", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
