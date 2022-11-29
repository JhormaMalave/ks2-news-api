'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.bulkInsert('Categories', [
      {
        name: 'Ks2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Deportes',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Susesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Caracas',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Categories', null, {});
  }
};
