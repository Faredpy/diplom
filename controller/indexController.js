class indexController {
    async indexGet (req, res) {
        res.render('index')
    }

    async deleteSession(req, res) {
        const sessionDestroy = await req.session.destroy()
        if(!sessionDestroy.user) {
            return res.status(400).end()
        }
        res.clearCookie('sid')
        return res.status(200).end()
    }
}

module.exports = new indexController()
