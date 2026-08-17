'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Permissions", [
      {
        name: "create_user",
        description: "creating of user"
      },
      {
        name: "view_users",
        description: "view the users"
      },
      {
        name: "delete_user",
        description: "delete a user"
      },
      {
        name: "create_course",
        description: "create a course"
      },
      {
        name: "upload_grade",
        description: "uploading of grades"
      },
      {
        name: "view_grade",
        description: "viewing grades"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions");
     
  }
};
