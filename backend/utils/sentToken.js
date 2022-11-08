const sentToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();

    //Option for cookie. Cookie is used to store token

    const options = {
        expire: new Date(
            Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    return res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
}

module.exports = sentToken;