const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')

router.get('/', userController.getAllUsers)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/check', userController.check)

module.exports = router