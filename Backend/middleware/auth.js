const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res) => {


    try {
        const { authtoken } = req.cookies;

        if (!authtoken) {
            console.log('Please login to access the data');
        }
        else {
            const verify = jwt.verify(authtoken, process.env.JSECRET);
            console.log(verify)
            return verify
        }
    } catch (error) {
        console.log(error)
    }




};

module.exports = verifyToken;