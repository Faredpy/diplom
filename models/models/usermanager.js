'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserManager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.User, {
        foreignKey: 'managerId'
      })
      this.hasMany(models.Order, {
        foreignKey: 'userManagersId'
      })
    }
  };
  UserManager.init({
    userId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserManager',
  });
  return UserManager;
};