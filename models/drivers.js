const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    fName: String,
    lName: String,
    balance: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('drivers',driverSchema)