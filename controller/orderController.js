const { Order, User, UserManager, Product, Tag } = require('../models/models')
const { Op } = require('sequelize')

class orderController {
    async getAllOrder(req, res) {
        try {
            const UserManagerReference = await UserManager.findOne({ where: { userId: req.body.user.id }, raw: true })
            console.log(UserManagerReference);
            const allOrders = await Order.findAll({ where: { userManagerId: UserManagerReference.id } })
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
            console.log('=======================================================');
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
            console.log('=======================================================');
            console.log(newOrder);
            res.json(newOrder)
        } catch (e) {
            console.log(e.message);
        }
    }

    async renderOrderForm(req, res) {
        const productsList = await Product.findAll({ raw: true })
        const tagsList = await Tag.findAll({ raw: true })
        res.render('orderForm', { productsList, tagsList })
    }

}

module.exports = new orderController()