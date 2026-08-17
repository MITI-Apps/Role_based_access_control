import User from "./User.js";
import Role from "./Role.js";
import Permission from "./Permission.js";
import UserRole from "./userrole.js";
import RolePermission from "./rolepermission.js";

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
  otherKey: "roleId",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  otherKey: "userId",
});

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
  otherKey: "permissionId",
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permissionId",
  otherKey: "roleId",
});

export { User, Role, Permission, UserRole, RolePermission };
