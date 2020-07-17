const jwt = require("jsonwebtoken");
const {
    getUserByUserId
} = require('./../models/user.model');
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            // Remove Bearer from string
            token = token.slice(7);

            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        status: 0,
                        message: "Unauthorized access."
                    });
                } else {
                    req.decoded = decoded;
                    req.user = req.decoded.result;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                status: 0,
                message: "Access Denied! Unauthorized User"
            });
        }
    }
};
