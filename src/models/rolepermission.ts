import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class RolePermission extends Model {
    declare roleId: number;
    declare permissionId: number;
}

RolePermission.init(
  {
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'RolePermissions',
    timestamps: false
  }
);

export default RolePermission;
