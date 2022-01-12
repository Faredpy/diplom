'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserManager, {
        foreignKey: 'userManagersId'
      })
      this.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
      this.belongsTo(models.Status, {
        foreignKey: 'statusId'
      })
    }
  };
  Order.init({
    userManagersId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    file: DataTypes.TEXT,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};