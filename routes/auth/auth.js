const express = require('express')
const crypto = require('crypto')
const usersModel = require('../../models/users')
const util = require('util')

const scrypt = util.promisify(crypto.scrypt)
const router = express.Router()

router.get('/login', (req,res)=>{
    console.log(req.session.userId)
    if(req.session.userId){
        return res.redirect('/')
    }
    res.render('./auth/login')
})

router.post('/login', async (req,res)=>{
    const { username, password } = req.body

    const user = await usersModel.findOne({username})
    const [hashedPassword,salt] = user.password.split('.')
    const result = await scrypt(password,salt,64)
    if(hashedPassword === result.toString('base64')){
        req.session.userId = username
        console.log("loggedIn")
        return res.redirect('/')
    }
})

router.get('/logout', async (req,res)=>{
    console.log('logout')
})

router.post('/signup', async (req,res)=>{
    const salt = await crypto.randomBytes(64)
    console.log(salt.toString('base64'))
    const key = await scrypt('123', salt.toString('base64'), 64)
    hashedPassword = `${key.toString('base64')}.${salt.toString('base64')}`
    console.log(hashedPassword)

    usersModel.create({
        username: 'admin',
        fName: 'admin',
        lName: 'admin',
        password: hashedPassword,
        email: 'admin@admin.com',
        isAdmin: true
    })
})


module.exports = router