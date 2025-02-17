

const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJWT();
    const cookieName = user.role === "User" ? "userToken" : "adminToken"
    
    res.status(statusCode)
    .cookie(cookieName, token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        )
    }).json({
        success: true,
        message,
        user,
        token
    });
};

export default generateToken;