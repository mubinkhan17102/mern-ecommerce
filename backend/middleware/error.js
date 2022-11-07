const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next)=>{
    err.status = err.status || 500;
    err.message = err.message || 'Internal server error'

    res.status(err.status).json({
        success: false,
        error: err.message
    })
}