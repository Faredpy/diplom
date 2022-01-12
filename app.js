const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const path = require('path')
const router = require('./routes/indexRouter')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const app = express()

const PORT = 3001
const sessionConfig = {
    name: 'sid',
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60,
        httpOnly: true
    }
}

app.set('view engine', 'hbs')
hbs.registerPartials(path.resolve(process.env.PWD, 'views', 'partials'))


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.resolve(process.env.PWD, 'public')))
app.use(morgan('dev'))
app.use(session(sessionConfig))
app.use('/', router)


app.listen(PORT, () => {
    console.log('Запустились на порту ' + PORT)
})
