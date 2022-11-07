const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next)=>{
    err.status = err.status || 500;
    err.message = err.message || 'Internal server error'

    //Mongodb cast error.
    if(err.name === 'CastError'){
        const message = `Resorce not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.status).json({
        success: false,
        error: err.message
    })
}