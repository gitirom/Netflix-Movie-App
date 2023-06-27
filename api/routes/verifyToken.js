const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const authHeader = req.headers.token; //token access
    if (authHeader) {
        const token = authHeader.split(" ")[1]   //barear (1254edzef655z5rfz2zefd10) => [1] 

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) res.status(403).json("Token is not Valid! ");
            req.user = user     // else part
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated! ");
    }
}

module.exports = verify;