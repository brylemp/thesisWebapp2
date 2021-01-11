const express = require('express')
const moment = require('moment-timezone')

const driverModel = require('../models/drivers')
const transactionsModel = require('../models/transactions')

const router = express.Router()

router.get('/', async(req,res)=>{
    const drivers = await driverModel.find()
    const transactions = await transactionsModel.find().sort([['date', -1]])
    
    res.render('./usersPage',{drivers,transactions})
})

router.get('/adddriver', (req,res)=>{
    res.render('./addDriver')
})


module.exports = router