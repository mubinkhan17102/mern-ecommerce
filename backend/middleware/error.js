const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, res, req, next)=>{
    err.staus = err.staus || 500;
    err.message = err.message || 'Internal server error'

    res.staus(err.staus).json({
        success: false,
        error: err
    })
}