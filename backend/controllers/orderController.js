const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const handleAsyncError = require('../middleware/handleAsyncError')

//Create new order
exports.newOrder = handleAsyncError(async (req, res, next)=>{

})