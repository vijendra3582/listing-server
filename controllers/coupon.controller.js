const { Validator } = require('node-input-validator');
const { create, update, deleteA, single, all } = require('./../models/coupon.model');

exports.insert = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    const v = new Validator(body, {
        title: 'required|string|minLength:2',
        valid_from: 'required',
        valid_to: 'required',
        discount_on_type: 'required',
        discount_on_id: '',
        coupon_code: 'required|alphaNumeric',
        discount_type: 'required|in:flat,percent',
        discount_value: 'required|decimal',
        status: 'required'
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
        title: 'required|string|minLength:2',
        valid_from: 'required',
        valid_to: 'required',
        discount_on_type: 'required',
        discount_on_id: 'requiredNotIf:discount_on_type,"all_project"',
        coupon_code: 'required|alphaNumeric',
        discount_type: 'required|in:flat,percent',
        discount_value: 'required|decimal',
        status: 'required'
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
    let query = req.query;
    query.currentSession = req.user;
    if (query.sortOrder) {
        if (query.sortOrder == "ascend")
            query.sortOrder = "asc";
        else
            query.sortOrder = "desc";
    }
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