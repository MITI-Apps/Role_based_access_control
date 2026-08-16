import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Role from "./Role.js";

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
  },

  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Role.hasMany(User, {
  foreignKey: "roleId"
});

User.belongsTo(Role, {
  foreignKey: "roleId"
});

export default User;