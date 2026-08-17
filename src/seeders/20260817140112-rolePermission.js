'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("RolePermissions", [
      {
        roleId: 1,
        permissionId: 1
      },
      {
        roleId: 1,
        permissionId: 2
      },
      {
        roleId: 1,
        permissionId: 3
      },
      {
        roleId: 1,
        permissionId: 4
      },
      {
        roleId: 1,
        permissionId: 5
      },
      {
        roleId: 1,
        permissionId: 6
      },
      {
        roleId: 2,
        permissionId: 2
      },
      {
        roleId: 2,
        permissionId: 4
      },
      {
        roleId: 2,
        permissionId: 5
      },
      {
        roleId: 2,
        permissionId: 6
      },
      {
        roleId: 3,
        permissionId: 6
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RolePermissions");
  }
};
