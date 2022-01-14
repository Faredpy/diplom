const Router = require('express')
const router = new Router()
const orderController = require('../controller/orderController')
const indexController = require('../controller/indexController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, orderController.getAllOrder)
router.get('/form', authMiddleware, orderController.renderOrderForm)
router.post('/', authMiddleware, orderController.createOrder)
router.put('/', authMiddleware, orderController.editOrder);


module.exports = router