const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const orderRouter = require('./orderRouter')
const ticketRouter = require('./ticketRouter')


router.use('/users', userRouter)
router.use('/chats', chatRouter)
router.use('/orders', orderRouter)
router.use('/tickets', ticketRouter)


router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router