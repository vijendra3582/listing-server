const { Validator } = require('node-input-validator');
const { check } = require('./../models/user.coupon.model');

exports.check = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    check(body, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        return res.status(200).json({
            status: true,
            data: result
        });
    });
}