const jwt = require('jsonwebtoken')
const {User, UserManager} = require('../models/models')

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.session.user.token
        if(!token) {
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY)
        const userUpdate = await User.update({
            online: true
        }, {
            where: { id: tokenDecoded.id }
        })


        console.log(tokenDecoded)
        if (tokenDecoded.role === 'USER') {
            tokenDecoded['roleName'] = 'Пользователь'
            console.log('-------------------')
        }else if (tokenDecoded.role === 'MANAGER'){
            tokenDecoded['roleName'] = 'Менеджер'
        }else if (tokenDecoded.role === 'ADMIN'){
            tokenDecoded['roleName'] = 'Администратор'
        }

        console.log(tokenDecoded)
        req.user = tokenDecoded
        next()
    }catch (e) {
        res.redirect('/users/login')
        // console.log(e)
        // res.status(500).json({message: "Пользователь не авторизован"})
    }
}