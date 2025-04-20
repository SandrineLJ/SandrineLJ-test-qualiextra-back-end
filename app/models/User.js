import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-client.js';

export class User extends Model {};

User.init(
    {
        firstname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
          },
          password: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          role: {
            type: DataTypes.ENUM(["member", "admin"]),
            allowNull: false,
            defaultValue: "member"
          }
    }, {
        sequelize,
        tableName: "user"
    }
);