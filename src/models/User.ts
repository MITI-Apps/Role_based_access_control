import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Role from "./Role.js";
import UserRole from "./userrole.js";

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'userId',
  otherKey: 'roleId'
});

export default User;