const { User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    async getAllUsers (req, res) {
        // console.log(req.session.user)
        if(req.session.user) {
            const isAuthorised = req.session.user.token
            return res.render('users', {isAuthorised})
        }
        return res.render('users')
    }

    async registrationGet (req,res) {
        return res.render('registration')
    }

    async registration (req,res) {
        const {email, password, checkUser, checkManager} = req.body
        if (!email || !password) {
            return res.status(400).json({message: 'Не указан email или пароль или роль'})
        }
        let role = 'USER'
        if(checkManager) role = 'MANAGER'
        try {
            const user = await User.findOne({where: {email}})
            if(user) return res.status(403).json({message: 'Пользователь с таким email уже существует'})
            const hash = await bcrypt.hash(password, 5)
            const userAdd = await User.create({email, password: hash, role})
            const token = generateJwt(userAdd.id, userAdd.email, userAdd.role)
            req.session.user = {token}
            return res.json({token})

        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e.message})
        }
    }

    async loginGet (req,res) {
        return res.render('login')
    }

    async login (req,res) {
        const {email, password, checkUser, checkManager} = req.body
        if ( !email || !password ) {
            return res.status(400).end()
        }
        try {

        }catch(e) {
            return res.status(403).end()
        }
    }

    async check (req,res) {

    }

}

module.exports = new userController()