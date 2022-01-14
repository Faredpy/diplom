const jwt = require('jsonwebtoken')
const { User, UserManager } = require('../models/models')

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.session.user.token
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' })
        }
        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY)
        await User.update({ online: true }, { where: { id: tokenDecoded.id } })
        const humanGet = await User.findOne({ where: { id: tokenDecoded.id }, raw: true })
        tokenDecoded['firstName'] = humanGet.firstName
        tokenDecoded['lastName'] = humanGet.lastName
        tokenDecoded['phone'] = humanGet.phoneNumber
        console.log(tokenDecoded)
        if (tokenDecoded.role === 'USER') {
            tokenDecoded['roleName'] = 'Пользователь'

            const managerGet = await User.findOne({include: [{ model: UserManager, where: { userId: tokenDecoded.id } }], raw: true })
                if(managerGet) {
                    tokenDecoded['managerId'] = managerGet.id
                    tokenDecoded['managerRoleName'] = 'Менеджер'
                    tokenDecoded['managerEmail'] = managerGet.email
                    tokenDecoded['managerPhone'] = managerGet.phoneNumber
                    tokenDecoded['managerFirstName'] = managerGet.firstName
                    tokenDecoded['managerLastName'] = managerGet.lastName
                    tokenDecoded['user'] = true
                    tokenDecoded['manager'] = false
                    tokenDecoded['admin'] = false
                }
        }else if (tokenDecoded.role === 'MANAGER'){

            tokenDecoded['roleName'] = 'Менеджер'
            tokenDecoded['user'] = false
            tokenDecoded['manager'] = true
            tokenDecoded['admin'] = false
        }else if (tokenDecoded.role === 'ADMIN') {
            tokenDecoded['roleName'] = 'Администратор'
            tokenDecoded['user'] = false
            tokenDecoded['manager'] = false
            tokenDecoded['admin'] = true
        }
        console.log(tokenDecoded)
        // console.log(tokenDecoded)
        req.user = tokenDecoded
        next()

    }catch (e) {
        console.log(e)

        res.redirect('/users/login')
        // console.log(e)
        // res.status(500).json({message: "Пользователь не авторизован"})
    }
}