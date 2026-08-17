import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class UserRole extends Model {
    declare userId: number;
    declare roleId: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
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
