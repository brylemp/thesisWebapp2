const express = require('express')
const moment = require('moment-timezone')
const { find } = require('../models/drivers')

const driverModel = require('../models/drivers')
const transactionsModel = require('../models/transactions')

const router = express.Router()

router.get('/adddriver', (req,res)=>{
    res.render('./addDriver')
})

router.get('/sakay', (req,res)=>{
    res.render('./tempRide.ejs')
})

router.post('/sakay', async (req,res)=>{
    const { driverId,studentId,date } = req.body
    const transaction = await transactionsModel.create({ driverId,studentId,date })
    console.log(transaction)
    res.redirect('/sakay')
})

router.get('/', async(req,res)=>{
    const { date } = req.query
    let findDate
    if(!date){
        findDate = new Date(Date.now())
    }
    else{
        findDate = new Date(date);
    }
    findDate.setHours(0, 0, 0, 0);
    
    const drivers = await driverModel.find()
    const transactions = await transactionsModel.find().sort([['date', -1]])

    for(let driver of drivers){
        driver.balanceOnDate = 0
        for(let transaction of transactions){
            if(transaction.driverId === driver._id.toString()){
                const dateOfT = new Date(transaction.date)
                dateOfT.setHours(0, 0, 0, 0);
                if(dateOfT.valueOf() === findDate.valueOf()){
                    driver.balanceOnDate += 5
                }
            }
        }
    }
    res.render('./usersPage/datePage',{drivers,date:moment(date).format('YYYY-MM-DD')})
})

module.exports = router