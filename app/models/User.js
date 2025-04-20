import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-client.js';
import argon2 from "argon2";

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
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          role: {
            type: DataTypes.ENUM(["member", "admin"]),
            allowNull: false,
            defaultValue: "member"
          },
          verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          },
    }, {
        sequelize,
        tableName: "user",
        // Hook pour hasher les mots de passe avant enregistrement en BDD
        hooks: {
          beforeCreate: async (user) => {
            if (user.password) {
              user.password = await argon2.hash(user.password);
            }
          },
          beforeUpdate: async (user) => {
            if (user.changed("password")) {
              user.password = await argon2.hash(user.password);
            }
          },
          beforeBulkCreate: async (users) => {
            for (const user of users) {
              if (user.password) {
                user.password = await argon2.hash(user.password);
              }
            }
          }
        }
    }
);