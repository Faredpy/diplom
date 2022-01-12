'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Ticket, {
        foreignKey: 'ticketId'
      })
      this.belongsTo(models.User, {
        foreignKey: 'adminId'
      })
    }
  };
  TicketAnswer.init({
    ticketId: DataTypes.INTEGER,
    answer: DataTypes.TEXT,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TicketAnswer',
  });
  return TicketAnswer;
};