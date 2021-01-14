const express = require('express')
const moment = require('moment-timezone')
const { find } = require('../models/drivers')

const driverModel = require('../models/drivers')
const transactionsModel = require('../models/transactions')

const router = express.Router()

router.get('/adddriver', (req,res)=>{
    res.render('./addDriver')
})

router.get('/sakay', async (req,res)=>{
    const drivers = await driverModel.find()
    res.render('./tempRide.ejs',{drivers})
})

router.post('/sakay', async (req,res)=>{
    const { driverId,studentId,date } = req.body
    const transaction = await transactionsModel.create({ driverId,studentId,date })
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

router.get('/driver/:driverId', async(req,res)=>{
    const { driverId } = req.params
    const drivers = await driverModel.find()
    const driverSelected = drivers.find(driver => driver._id.toString() === driverId)
    const transactions = await transactionsModel.find()
    console.log(driverSelected)
    driverSelected.transactions = []
    driverSelected.transactionsOnDate = []
    for(let transaction of transactions){
        if(transaction.driverId === driverSelected._id.toString()){
            driverSelected.transactions.push(transaction)
        }

        if(transaction.driverId === driverSelected._id.toString()){
            const dateOfT = new Date(transaction.date)
            dateOfT.setHours(0, 0, 0, 0);
            const exists = driverSelected.transactionsOnDate.find(trans => {
                trans.date.setHours(0, 0, 0, 0)
                // console.log(trans.date.getTime(),dateOfT.getTime(),trans.date.getTime()===dateOfT.getTime())
                if(trans.date.getTime()===dateOfT.getTime()){
                    return trans.date
                }
            })
            if(exists){
                exists.balanceOnDate += 5
            }
            else{
                driverSelected.transactionsOnDate.push({date:dateOfT,balanceOnDate:5})
            }
        }
    }
    // const answer = driverSelected.transactionsOnDate.find(trans => {
    //     if()
    //     return trans.date.toLocaleString()
    // })
    res.render('./usersPage/driverPage',{drivers,driverSelected})
})

module.exports = router