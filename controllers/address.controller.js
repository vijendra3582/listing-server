const { Validator } = require('node-input-validator');
const { create, update, deleteA, single, all } = require('./../models/address.model');

exports.insert = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    const v = new Validator(body, {
        name: 'required|string|minLength:2|maxLength:255',
        mobile: 'required|phoneNumber',
        pincode: 'required',
        locality: 'required',
        address: 'required',
        state: 'required',
        city: 'required',
        landmark: 'minLength:2',
        alternate_mobile: 'phoneNumber',
        address_type: 'required',
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        create(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }
            return res.status(200).json({
                status: result.status,
                message: result.message
            });
        });
    });
}

exports.update = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    const v = new Validator(body, {
        name: 'required|string|minLength:2|maxLength:255',
        mobile: 'required|phoneNumber',
        pincode: 'required',
        locality: 'required',
        address: 'required',
        state: 'required',
        city: 'required',
        landmark: 'minLength:2',
        alternate_mobile: 'phoneNumber',
        address_type: 'required',
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        update(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }
            return res.status(200).json({
                status: result.status,
                message: result.message
            });
        });
    });
}

exports.delete = (req, res, next) => {
    var id = Number(req.params.id);
    var data = { "id": id };
    data.currentSession = req.user;
    deleteA(data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        return res.status(200).json({
            status: result.status,
            message: result.message
        });
    });
}

exports.all = (req, res, next) => {
    let query = {};
    query.currentSession = req.user;
    all(query, (err, result) => {
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

exports.single = (req, res, next) => {
    var id = Number(req.params.id);
    var data = { "field": "id", "value": id };
    data.currentSession = req.user;
    single(data, (err, result) => {
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