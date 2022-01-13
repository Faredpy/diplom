const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

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
        await User.update({
            online: true
        }, {
            where: { id: tokenDecoded.id }
        })
        req.user = tokenDecoded
        next()
    }catch (e) {
        res.redirect('/users/login')
        // console.log(e)
        // res.status(500).json({message: "Пользователь не авторизован"})
    }
}