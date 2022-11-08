const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler')
const handleAsyncError = require('../middleware/handleAsyncError');
const sentToken = require('../utils/sentToken')

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

    sentToken(user, 201, res);

})


exports.loginUser = handleAsyncError(async (req, res, next)=>{
    const {email, password} = req.body;

    //Checking if user given pass and email both
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and pass', 400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler('Invalid emial or password', 400));
    }

    const isMatchPassword = user.comparePassword(user.password);

    if(!isMatchPassword){
        return next(new ErrorHandler('Invalid emial or password', 400));
    }

    sentToken(user, 200, res);
})