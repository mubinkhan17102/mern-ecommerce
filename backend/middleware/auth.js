const ErrorHandler = require('../utils/errorHandler');
const handleAsyncError = require('./handleAsyncError')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthinticated = handleAsyncError(async (req, res, next)=>{
    const {token} = req.cookies;

    if(! token){
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    const decodedData = jwt.decode(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    req.user = user;

    next()
})

exports.authorizedUser = (...roles)=>{
    return (req, res, next)=>{

        if(! roles){
            return next(new ErrorHandler('Onely authorized user can access this resource'));
        }

        if(! roles.includes(req.user.role)){
            return next(new ErrorHandler('Onely authorized user can access this resource'));
        }
        next();
    }
}