const { Validator } = require('node-input-validator');
const { save, increment, decrement, remove, all } = require('./../models/cart.model');

exports.save = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;

    save(body, (err, result) => {
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

exports.increment = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;

    increment(body, (err, result) => {
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

exports.decrement = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;

    decrement(body, (err, result) => {
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

exports.remove = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    body.product_id = Number(req.params.product_id);
    remove(body, (err, result) => {
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

exports.all = (req, res, next) => {
    let body = req.body;
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