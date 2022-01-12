
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Products', [{
            title: 'Дипломная работа',
            price: 10000,
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                title: 'Курсовая работа',
                price: 2500,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Контрольная работа',
                price: 2000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Магистерская работа',
                price: 15000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Решение задач',
                price: 500,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'ЭССЕ сочинение',
                price: 1500,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Реферат',
                price: 2000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Диссертация',
                price: 30000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Чертеж',
                price: 1500,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Задание на практике',
                price: 3000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Отчет по практике',
                price: 3000,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Ответы на билеты',
                price: 500,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Products', null, {
            restartIdentity: true,
            truncate: true,
            cascade: true,
        });
    },
}