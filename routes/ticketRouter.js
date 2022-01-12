const Router = require('express')
const router = new Router()
const ticketController = require('../controller/ticketController')

router.get('/', ticketController.getAllTicket)
router.post('/', ticketController.createTicket)
router.get('/form', ticketController.renderFormForTickets)
router.put('/', ticketController.editTicket);
router.delete('/', ticketController.cancelTicket);

module.exports = router