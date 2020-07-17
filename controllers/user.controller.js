const { Validator } = require('node-input-validator');
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { create, update, deleteA, single, all } = require('./../models/user.model');

exports.insert = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    
    const v = new Validator(body, {
        name: 'required|string|minLength:2',
        email: 'required|email',
        mobile: 'required|phoneNumber',
        password: 'required|minLength:8',
        address: 'required',
        state: 'required',
        city: 'required',
        profession: 'required'
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        
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
        name: 'required|string|minLength:2',
        email: 'required|email',
        mobile: 'required|phoneNumber',
        address: 'required',
        state: 'required',
        city: 'required',
        profession: 'required'
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