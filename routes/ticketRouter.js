const Router = require('express')
const router = new Router()
const ticketController = require('../controller/ticketController')

router.get('/', ticketController.getAllTicket)
router.post('/', ticketController.createTicket)

module.exports = router