const Router = require('express')
const router = new Router()
const indexController = require('../controller/indexController')
const authMiddleware = require('../middleware/authMiddleware')

const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const orderRouter = require('./orderRouter')
const ticketRouter = require('./ticketRouter')
const accessRouter = require('./accessRouter')
const managerRouter = require('./managerRouter')

router.use('/users', userRouter)
router.use('/chats', chatRouter)
router.use('/orders', orderRouter)
router.use('/tickets', ticketRouter)
router.use('/accesserror', accessRouter)
router.use('/managers', managerRouter)

router.get('/', authMiddleware, indexController.indexGet)
router.delete('/logout', indexController.deleteSession)


module.exports = router