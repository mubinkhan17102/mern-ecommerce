const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const handleAsyncError = require('../middleware/handleAsyncError');
const ApiFeatures = require('../utils/apiFeature');

//Create product
exports.createProduct = handleAsyncError(async (req, res, next)=>{

    req.body.user = req.user._id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

exports.getAllProducts = handleAsyncError(async (req, res)=>{
    const productCount = await Product.count({});
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().paginate(3)
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    })
});

exports.getProductDetails = handleAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 400));
    }

    return res.status(200).json(product)
});

exports.updateProduct = handleAsyncError(async (req, res, next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body , {
        new: true
    })

    res.status(200).json({
        success: true,
        product
    })
});

exports.deleteProduct = handleAsyncError(async (req, res, next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        })
    }

    await product.remove();

    return res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
});
