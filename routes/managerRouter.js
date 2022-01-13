const Router = require('express')
const router = new Router()
const managerController = require('../controller/managerController')

router.post('/', managerController.getAllManagers)

module.exports = router