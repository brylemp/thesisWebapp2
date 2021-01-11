const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb+srv://brylemp:12345@rest.d7l3g.mongodb.net/thesis_users?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })

const authRouter = require('./routes/auth/auth')
const usersPageRouter = require('./routes/usersPage')
const driverApi = require('./routes/api/drivers')

const app = express()

app.set('view engine', 'ejs')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'dfsljkg0394njkdfb8034jker48932oiwe',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true },
  store: new MongoStore({mongooseConnection: mongoose.connection,dbName:"thesis_cookies"})
}))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(authRouter)
app.use(usersPageRouter)
app.use(driverApi)

app.listen(3000,()=> console.log("listening"))