import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Role from "./Role.js"

class UserRole extends Model {
    declare userId: number;
    declare roleId: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    static associate(models: Record<string, unknown>){
        UserRole.belongsTo(User, {
            foreignKey: 'userId'
        });
        UserRole.belongsTo(Role, {
            foreignKey: 'roleId'
        });        
    }
}

UserRole.init(
  {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'UserRole',
    tableName: 'UserRoles'
  }
);
export default UserRole;