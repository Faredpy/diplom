const Router = require('express')
const router = new Router()
const orderController = require('../controller/orderController')

router.get('/', orderController.getAllOrder)
router.post('/', orderController.createOrder)


module.exports = router