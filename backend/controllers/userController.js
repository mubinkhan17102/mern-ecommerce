const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler')
const handleAsyncError = require('../middleware/handleAsyncError');
const sentToken = require('../utils/sentToken')
const sendEmail = require('../utils/sendEmail');

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

exports.logout = handleAsyncError(async (req, res, next)=>{

    res.cookie('token', null , {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Forgot password controller
exports.forgotPassword = handleAsyncError(async (req, res, next)=>{

    const user = await User.findOne({
        email: req.body.email
    })

    if(!user){
        return next(new ErrorHandler('User not found', 404))
    }

    //Get the reset pass token

    const resetToken = user.getResetPasswordToken();

    await user.save()

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is : - \n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore`;

    try{
        await sendEmail({
            email: user.email,
            subject: 'Pass recovery',
            message: message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    }catch(err){
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save();

        return next(new ErrorHandler(err.message, 500));
    }

})