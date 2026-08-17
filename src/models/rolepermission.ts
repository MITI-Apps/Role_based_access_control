import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Role from "./Role.js";
import Permission from "./Permission.js";

class RolePermission extends Model {
    declare roleId: number;
    declare permissionId: number;

    static associate(models: Record<string, unknown>){
        RolePermission.belongsTo(Role, {
            foreignKey: 'roleId'
        });
        RolePermission.belongsTo(Permission, {
            foreignKey: 'permissionId'
        });
    }
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
