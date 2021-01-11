const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    fName: String,
    lName: String,
    password: String,
    email: String,
    isAdmin: Boolean
})

module.exports = mongoose.model('users',userSchema)