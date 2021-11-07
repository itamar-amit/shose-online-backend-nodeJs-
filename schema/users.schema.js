const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minlength: 2,
        required: true
    },
    email: {
        type: String,
        minlength: 10,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        min: 10,
        unique: true,
        required: true,
    },
    password: {
        type: String, 
        minlength: 6,
        required: true,
    },
    level: {
        type: String,
        enum: ['admin' , 'user'],
        default: 'user'
    }
})

const userModel = mongoose.model("users" , userSchema)

module.exports = { userModel }