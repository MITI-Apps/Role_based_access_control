import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import UserRole from "./userrole.js";
import Role from "./Role.js";
import RolePermission from "./rolepermission.js";

const Permission = sequelize.define(
  "Permission",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);

Permission.belongsToMany(Role, {
      through: RolePermission,
      foreignKey: 'permissionId',
      otherKey: 'roleId'
});

export default Permission;
