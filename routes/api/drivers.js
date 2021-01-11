const express = require('express')

const driverModel = require('../../models/drivers')
const transactionsModel = require('../../models/transactions')

const router = express.Router()

router.get('/api/drivers', async(req,res)=>{
    const drivers = await driverModel.find()
    console.log(drivers)
    res.json(drivers)
})

router.post('/api/driver', async(req,res)=>{
    const { fName,lName,balance } = req.body
    const driver = await driverModel.create({ fName,lName,balance })
    console.log(driver)
    res.json(driver)
})


router.get('/api/sakay/:studentId/:driverId', async(req,res)=>{
    const { studentId, driverId } = req.params
    const transaction = await transactionsModel.create({driverId,studentId})
    console.log(transaction)
    res.json(transaction)

    const driver = await driverModel.findById(driverId)
    driver.balance = driver.balance + 5
    driver.save()
})


module.exports = router