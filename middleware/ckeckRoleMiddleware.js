const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.session.user.token
            // const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({message: 'Пользователь не авторизован'})
            }
            const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY)
            if (tokenDecoded.role !== role) {
                return res.status(403).json({message: 'Нет прав'})
            }
            req.user = tokenDecoded
            next()

        }catch(e){
            res.redirect('/accesserror')
            // console.log(e)
            // res.status(401).json({message: "Пользователь не авторизован"})
        }
    }
}