'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "Admin"
      },
      {
        name: "Teacher"
      },
      {
        name: "Student"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles");
  }
};
