const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler')
const handleAsyncError = require('../middleware/handleAsyncError');

//Register user
exports.registerUser = handleAsyncError(async (req, res, next)=>{

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'This is sample id',
            url:'profileurl'
        }
    })

    res.status(201).json({
        success: true,
        user
    })

})