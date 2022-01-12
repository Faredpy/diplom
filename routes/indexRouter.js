const Router = require('express')
const router = new Router()
const indexController = require('../controller/indexController')

const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const orderRouter = require('./orderRouter')
const ticketRouter = require('./ticketRouter')

router.use('/users', userRouter)
router.use('/chats', chatRouter)
router.use('/orders', orderRouter)
router.use('/tickets', ticketRouter)


router.get('/', indexController.indexGet)
router.delete('/logout', indexController.deleteSession)

module.exports = router