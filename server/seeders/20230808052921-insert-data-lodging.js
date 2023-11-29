'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Lodgings", [
      { 
        name : "SkyBlue",
        facility : "Kitchen Set",
        roomCapacity : 4,
        imgUrl : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.windsorcommunities.com%2Four-apartments%2F&psig=AOvVaw3AhQNezWShyBT2c2jvx_tX&ust=1691559309007000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCf5M-rzIADFQAAAAAdAAAAABAE",
        authorId : 1,
        location : "Bogor",
        price : 1250000,
        typeId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Amaris",
        facility : "Double Bed",
        roomCapacity : 2,
        imgUrl : "https://anuhar.com/blog/wp-content/uploads/2022/11/apartment-in-Hyderabad.png",
        authorId : 2,
        location : "Pekalongan",
        price : 650000,
        typeId : 2,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : "Wismaut",
        facility : "Swimming pool",
        roomCapacity : 3,
        imgUrl : "https://blog.remax.ca/wp-content/uploads/sites/8/2019/02/condo-690x518.jpg",
        authorId : 3,
        location : "Pekalongan",
        price : 650000,
        typeId : 3,
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
    await queryInterface.bulkDelete("Lodgings", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
