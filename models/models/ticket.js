'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.Status, {
        foreignKey: 'statusId'
      })
      this.hasMany(models.TicketAnswer, {
        foreignKey: 'ticketId'
      })
    }
  };
  Ticket.init({
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};