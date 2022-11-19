const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalRating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
} , { timestamps: true })

module.exports = mongoose.model('Product', productSchema)