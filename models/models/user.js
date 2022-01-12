'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserManager, {
        foreignKey: 'userId'
      })
      this.hasMany(models.UserManager, {
        foreignKey: 'managerId'
      })
      this.hasMany(models.Chat, {
        foreignKey: 'authorId'
      })
      this.hasMany(models.Chat, {
        foreignKey: 'destinationId'
      })
      this.hasMany(models.Ticket, {
        foreignKey: 'userId'
      })
      this.hasMany(models.TicketAnswer, {
        foreignKey: 'adminId'
      })
      this.belongsToMany(models.Tag, {
        through: 'UserTags',
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'USER'
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    statusManager: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};