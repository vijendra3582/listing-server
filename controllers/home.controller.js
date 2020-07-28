const { Validator } = require('node-input-validator');
const { filter, details, vendor, products, listing } = require('./../models/home.model');

exports.details = (req, res, next) => {
    let body = req.body;
    details(body, (err, result) => {
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

exports.vendor = (req, res, next) => {
    let body = req.body;
    body.slug = req.params.slug;
    vendor(body, (err, result) => {
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

exports.products = (req, res, next) => {
    let body = req.body;
    body.vendor_slug = req.params.vendor_slug;
    products(body, (err, result) => {
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

exports.listing = (req, res, next) => {
    let body = req.body;
    listing(body, (err, result) => {
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

exports.filter = (req, res, next) => {
    let body = req.body;
    filter(body, (err, result) => {
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