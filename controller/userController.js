const { User, Tag, UserManager, UserTag} = require('../models/models')
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
    async getProfile (req, res) {
        if(req.user) {
            try {

            } catch (e) {

            }
            if(req.user.role === 'MANAGER'){
                console.log(req.user.id)
                const managerTags = await User.findAll ({
                    where: { id: req.user.id },
                    include: {
                        model: Tag,
                        as: 'Tags',
                        through: {
                            model: UserTag,
                            attributes: []
                        }
                    },
                    raw: true
                })
                // const arrManTag = []
                const arrManTag = managerTags.map((e) => {
                    return e['Tags.title']
                })

                const tags = await Tag.findAll()
                req.user.managerTags = arrManTag
                req.user.tags = tags
            }
            const isAuthorised = req.user
            // console.log(req.user)
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

        const {email, password} = req.body
        if ( !email || !password ) {
            return res.status(400).json({message: 'No oke'})
        }
        try {
            const user = await User.findOne({where: {email}})
            if(!user) {
                console.log('такого юзера нет!')
                return res.status(402).json({message: 'No oke'})
            }

            const authUser = await bcrypt.compareSync(password, user.password)
            if(!authUser) {
                return res.status(403).json({message: 'No oke'})
            }
            const token = generateJwt(user.id, user.email, user.role)
            req.session.user = {token}
            // res.setHeader('Authorization', req.headers.authorization)
            res.setHeader('Content-Type', 'text/html')

            return res.json({token})
        }catch(e) {
            return res.status(500).json({ error: e.message})
        }
    }

    async putUser (req, res) {
        const data = req.body
        console.log(data)
        try {
            const user = await User.update(data, {where: {email: data.email}})
            if(data.tags){
                data.tags.map(async el => {
                    const tagGetDb = await Tag.findOne({where: { title: el}, raw: true})
                    console.log(tagGetDb.id)
                    const tagsId = tagGetDb.id
                    await UserTag.create({userId:data.id, tagsId})
                })
            }
            res.json(user)
        } catch(e) {
          console.log(e)
            return res.sendStatus(500)
        }
    }


}

module.exports = new userController()