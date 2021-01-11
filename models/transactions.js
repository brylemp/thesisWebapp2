const mongoose = require('mongoose')
const moment = require('moment-timezone')

const transactionSchema = mongoose.Schema({
    date:{
        type: Date,
        default: moment.tz(Date.now(),'Asia/Manila')
    },
    driverId: String,
    studentId: String,
    amount:{
        type: Number,
        default: 5
    } 
})

module.exports = mongoose.model('transactions',transactionSchema)