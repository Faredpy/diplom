const Router = require('express')
const router = new Router()
const ticketController = require('../controller/ticketController')
const checkRoleMiddleware = require('../middleware/ckeckRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, ticketController.getAllTicket)
router.post('/', authMiddleware, ticketController.createTicket)
router.get('/form', authMiddleware, ticketController.renderFormForTickets)
router.put('/', checkRoleMiddleware('ADMIN'), ticketController.editTicket);
router.delete('/', checkRoleMiddleware('ADMIN'), ticketController.cancelTicket);

module.exports = router