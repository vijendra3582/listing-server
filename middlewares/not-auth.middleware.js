const jwt = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            // Remove Bearer from string
            token = token.slice(7);

            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    req.user = { "id": "0", "role": "" };
                    next();
                } else {
                    req.decoded = decoded;
                    req.user = { "id": req.decoded.result.id, "role": req.decoded.result.role };
                    next();
                }
            });
        } else {
            req.user = { "id": "0", "role": "" };
            next();
        }
    }
};
