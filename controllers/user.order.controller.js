const { place, all } = require('./../models/user.order.model');

exports.place = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    place(body, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        return res.status(200).json({
            status: result.status,
            data: result.message
        });
    });
}

exports.all = (req, res, next) => {
    let body = {};
    body.currentSession = req.user;
    all(body, (err, result) => {
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