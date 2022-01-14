const { Order, User, UserManager, Product, Tag, Status } = require('../models/models')
const { Op } = require('sequelize')

class orderController {
    async getAllOrder(req, res) {
        const isAuthorised = req.user
        try {

            if (isAuthorised.role === 'ADMIN') {

                const allOrders = await Order.findAll({
                    include: [{
                        model: UserManager,
                        attributes: ['userId'],
                        include: { model: User, attributes: ['firstName', 'lastName', 'email', 'phoneNumber'] }
                    }, {
                        model: Tag,
                        attributes: ['title']
                    }, {
                        model: Status,
                        attributes: ['title']
                    }, {
                        model: Product,
                        attributes: ['title']
                    }]
                })

                res.render('allorders', { allOrders, isAuthorised })
                return
            }







            if (isAuthorised.role === 'MANAGER') {
                const userManagerReference = await UserManager.findAll({ where: { managerId: isAuthorised.id }, raw: true })


                // if (!userManagerReference) {
                //     res.render('allorders')
                // }


                const allders = () => {
                    return userManagerReference.reduce(async (acc, el) => {
                        const tempId = el.id
                        const result = await Order.findAll({
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
                            }, {
                                model: Product,
                                attributes: ['title']
                            }]
                        })
                        console.log(acc);
                        console.log(result);
                        acc.push(result)
                        return
                    }, [])
                }
                const allOrders = await allders()
                console.log('---------------------------------------------------');
                console.log(allOrders);
                res.render('allorders', { allOrders, isAuthorised })
                return
            }




            if (isAuthorised.role === 'USER') {
                const userManagerReference = await UserManager.findOne({ where: { userId: isAuthorised.id }, raw: true })

                if (!userManagerReference) {
                    res.render('allorders', { isAuthorised })
                }

                const tempId = await userManagerReference.id

                const allOrders = await Order.findAll({
                    where: { userManagersId: tempId },
                    include: [{
                        model: UserManager,
                        attributes: ['managerId'],
                        include: { model: User, attributes: ['firstName', 'lastName', 'email', 'phoneNumber'] }
                    }, {
                        model: Tag,
                        attributes: ['title']
                    }, {
                        model: Status,
                        attributes: ['title']
                    }, {
                        model: Product,
                        attributes: ['title']
                    }]
                })

                console.log(isAuthorised);
                res.render('allorders', { allOrders, isAuthorised })
                return
            }
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
                createdAt: new Date()
            })
            console.log(newOrder);
            res.json(newOrder)
        } catch (e) {
            console.log(e.message);
        }
    }

    async renderOrderForm(req, res) {
        try {
            const productsList = await Product.findAll({ raw: true })
            const tagsList = await Tag.findAll({ raw: true })
            const isAuthorised = req.user
            res.render('orderForm', { productsList, tagsList, isAuthorised })
        } catch (error) {
            console.log(error.message);
        }
    }

    async editOrder(req, res) {
        if (req.body.newStatus === 'CONFIRM') {
            try {
                const updatedOrder = Order.update({ statusId: 2 }, { where: { id: req.body.orderId } })
                res.json(updatedOrder)
            } catch (error) {
                console.log(error.message);
                res.sendStatus(500)
            }
        } else if (req.body.newStatus === 'CANCEL') {
            try {
                const updatedOrder = Order.update({ statusId: 4 }, { where: { id: req.body.orderId } })
                res.json(updatedOrder)
            } catch (error) {
                console.log(error.message);
                res.sendStatus(500)
            }

        } else {

        }
    }

}

module.exports = new orderController()