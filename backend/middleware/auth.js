const ErrorHandler = require('../utils/errorHandler');
const handleAsyncError = require('./handleAsyncError')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isAuthinticated = handleAsyncError(async (req, res, next)=>{
    const {token} = req.cookies;

    if(! token){
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    const decodedData = jwt.decode(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    req.user = user;

    next()
})

module.exports = isAuthinticated