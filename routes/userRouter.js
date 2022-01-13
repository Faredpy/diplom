const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, userController.getProfile)
router.put('/', userController.putUser)
router.get('/registration', userController.registrationGet)
router.post('/registration', userController.registration)
router.get('/login', userController.loginGet)
router.post('/login', userController.login)


module.exports = router