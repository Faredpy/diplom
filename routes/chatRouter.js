const Router = require('express')
const router = new Router()
const chatController = require('../controller/chatController')


router.get('/', chatController.getAllMessage)
router.post('/', chatController.createMessage)

module.exports = router