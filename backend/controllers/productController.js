const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const handleAsyncError = require('../middleware/handleAsyncError');
const ApiFeatures = require('../utils/apiFeature');
const { default: mongoose, Mongoose, mongo } = require('mongoose');

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

//Create new review or update the review
exports.createProductReview = handleAsyncError(async (req, res, next)=>{
    const {rating, comment, productId} = req.body;

    const ratingInput = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.exists({
        _id: new mongoose.Types.ObjectId(productId),
        'reviews.user': new mongoose.Types.ObjectId(ratingInput.user) 
    })

    let updatedProduct

    if(!product){
       updatedProduct = await Product.findByIdAndUpdate(productId, {
            $push:{
                reviews: ratingInput
            },
            $inc: {
                totalRating: ratingInput.rating,
                ratingCount: 1 
            }
       },
       {new : true}
       );
    }else{
        const udateReviewInput = {};
        if(rating){
            udateReviewInput['reviews.$.rating'] = rating;
        }
        if(comment){
            udateReviewInput['reviews.$.comment'] = comment;
        }
        updatedProduct = await Product.updateOne({
            _id: new mongoose.Types.ObjectId(productId),
            'reviews.user': new mongoose.Types.ObjectId(ratingInput.user)
        },
        {
            $set: udateReviewInput
        },
        {
            new: true
        }
        )
    }

    res.status(200).json({
        success: true,
        updatedProduct
    })
})

//Get all product reviews
exports.productReviews = handleAsyncError(async (req, res, next)=>{
    const productId = req.params.id
    const product = await Product.findById(productId).select('reviews');

    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete product review
exports.deleteReview = handleAsyncError(async (req, res, next)=>{
    const user = req.user._id;
    const productId = req.params.id

    const product = await Product.findByIdAndUpdate(productId, {
        $pull: {
            'reviews': {user: new mongoose.Types.ObjectId(user)}
        }
    })

    res.json({
        success: true,
        product
    })
})