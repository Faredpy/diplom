const { Order, User, UserManager, Product, Tag, Status } = require('../models/models')
const { Op } = require('sequelize')

class orderController {
    async getAllOrder(req, res) {
        try {
            const userManagerReference = await UserManager.findOne({ where: { userId: req.user.id }, raw: true })
            const tempId = userManagerReference.id
            console.log(userManagerReference);
            const allOrders = await Order.findAll({
                where: { userManagersId: tempId },
                include: [{
                    model: UserManager,
                    include: { model: User, attributes: ['firstName', 'lastName', 'email', 'phoneNumber'] }
                }, {
                    model: Tag,
                    attributes: ['title']
                }, {
                    model: Status,
                    attributes: ['title']
                }]
            })
            console.log('================================================');
            console.log(allOrders[0].UserManager.User);
            console.log('================================================');
            console.log(allOrders[0].Tag);
            console.log('================================================');
            console.log(allOrders[0].Status);
            res.render('allorders', { allOrders })
        } catch (error) {
            console.log(error.message);
        }
    }
    async createOrder(req, res) {
        const data = req.body
        console.log(data);
        try {
            const [userManagerReference, created] = await UserManager.findOrCreate({
                where: { userId: req.user.id, managerId: data.currManag },
                defaults: {
                    userId: req.user.id, managerId: data.currManag
                }
            })
            console.log(userManagerReference);
            console.log(userManagerReference.id);
            const tempId = userManagerReference.id
            const newOrder = await Order.create({
                productId: data.currProd,
                description: data.currDescr,
                statusId: 1,
                tagsId: data.currTag,
                scopeOfWork: data.currScope,
                userManagersId: tempId,
            })
            console.log(newOrder);
            res.json(newOrder)
        } catch (e) {
            console.log(e.message);
        }
    }

    async renderOrderForm(req, res) {
        const productsList = await Product.findAll({ raw: true })
        const tagsList = await Tag.findAll({ raw: true })
        const isAuthorised = req.user
        res.render('orderForm', { productsList, tagsList, isAuthorised })
    }

}

module.exports = new orderController()