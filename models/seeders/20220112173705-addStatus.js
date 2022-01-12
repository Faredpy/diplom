'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Statuses', [
       {
         title: 'В обработке',
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         title: 'Подтвержден',
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         title: 'Выполнен',
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         title: 'Отменен',
         createdAt: new Date(),
         updatedAt: new Date(),
       }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Statuses', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
}
