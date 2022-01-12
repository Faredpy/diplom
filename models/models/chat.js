'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
      this.belongsTo(models.User, {
        foreignKey: 'destinationId'
      })
    }
  };
  Chat.init({
    authorId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    destinationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};