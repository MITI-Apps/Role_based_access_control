import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import UserRole from "./userrole.js";
import Permission from "./Permission.js";
import RolePermission from "./rolepermission.js";

const Role = sequelize.define(
  "Role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
);

Role.belongsToMany(User, {
      through: UserRole,
      foreignKey: 'roleId',
      otherKey: 'userId'
});

Role.belongsToMany(Permission, {
      through: RolePermission,
      foreignKey: 'roleId',
      otherKey: 'permissionId'
});

export default Role;