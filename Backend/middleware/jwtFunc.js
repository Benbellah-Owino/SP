const jwt = require("jsonwebtoken");

const signToken = (id, username, role) => {
    return jwt.sign({ id, username, role }, process.env.JSECRET, { expiresIn: "3d" });
}

const sendToken = (res, token) => {
    console.log(token)
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.cookie("authtoken", token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000
    })

}

module.exports = {
    signToken,
    sendToken
}