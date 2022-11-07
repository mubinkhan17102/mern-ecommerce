const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Name can not excid 30 chars'],
        minLength: [4, 'Name should have more then five chars']
    },
    emial:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid emial']
    },
    password: {
        type: String,
        required:[true, 'Please enter your password'],
        minLength: [8, 'Password should have at least eight chars'],
        select: false
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date
})

module.exports = mongoose.model("User", userSchema);