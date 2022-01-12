const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', userController.getAllUsers)
router.get('/registration', userController.registrationGet)
router.post('/registration', userController.registration)
router.get('/login', userController.loginGet)
router.post('/login', userController.login)
router.post('/check', authMiddleware, userController.check)


module.exports = router