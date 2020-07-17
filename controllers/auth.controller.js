const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Validator } = require('node-input-validator');
const {
    create,
    getByEmail,
    getByEmailVendor,
    getByEmailAdmin
} = require('./../models/auth.model');
const { getTransporter } = require('./../config/mailer');

exports.registerCustomer = (req, res, next) => {

    let body = req.body;
    const v = new Validator(body, {
        name: 'required|string|minLength:2',
        email: 'required|email',
        mobile: 'required|phoneNumber',
        password: 'required|minLength:8|same:confirm_password',
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

        body.plain_password = body.password;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        body.role = 'customer';
        create(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }
            getTransporter().sendMail({
                    from: process.env.MAIL_FROM,
                    to: body.email,
                    subject: 'Thank you for registration !',
                    text: 'You username is : ' + body.email + ' and your password is : ' + body.plain_password + '.',
                }).then(([resMail]) => {
                    return res.status(200).json({
                        status: result.status,
                        message: result.message
                    });
                })
                .catch(err => {
                    console.log('Errors occurred, failed to deliver message');
                    if (err.response && err.response.body && err.response.body.errors) {
                        err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
                    } else {
                        console.log(err);
                    }
                });
        });
    });
};

exports.registerVendor = (req, res, next) => {

    let body = req.body;
    const v = new Validator(body, {
        name: 'required|string|minLength:2',
        email: 'required|email',
        mobile: 'required|phoneNumber',
        password: 'required|minLength:8|same:confirm_password',
        address: 'required',
        pincode: 'required',
        state: 'required',
        city: 'required',
        is_gst: 'required',
        gst_number: 'requiredIf:is_gst,1',
        gst_bussiness_name: 'requiredIf:is_gst,2',
        gst_pan: 'requiredIf:is_gst,2',
        gst_bussiness_type: 'requiredIf:is_gst,2',
        gst_add_room: 'requiredIf:is_gst,2',
        gst_add_street: 'requiredIf:is_gst,2',
        gst_add_pincode: 'requiredIf:is_gst,2',
        gst_add_city: 'requiredIf:is_gst,2',
        gst_add_state: 'requiredIf:is_gst,2',
        gst_add_proof_file: 'requiredIf:is_gst,2',
        gst_add_proof_sign: 'requiredIf:is_gst,2',
        is_bank: 'required',
        bank_acc_holder_name: 'requiredIf:is_bank,1',
        bank_acc_number: 'requiredIf:is_bank,1'
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
        body.role = 'vendor';
        create(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }
            getTransporter().sendMail({
                    from: process.env.MAIL_FROM,
                    to: body.email,
                    subject: 'Thank you for registration !',
                    text: 'You username is : ' + body.email + ' and your password is : ' + body.plain_password + '.',
                }).then(([resMail]) => {
                    return res.status(200).json({
                        status: result.status,
                        message: result.message
                    });
                })
                .catch(err => {
                    console.log('Errors occurred, failed to deliver message');
                    if (err.response && err.response.body && err.response.body.errors) {
                        err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
                    } else {
                        console.log(err);
                    }
                });
        });
    });
};

exports.loginCustomer = (req, res, next) => {
    let body = req.body;
    const v = new Validator(body, {
        email: 'required|email',
        password: 'required'
    });

    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }

        getByEmail(body, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }

            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_EXPIRE
                });
                return res.status(200).json({
                    status: true,
                    message: "Login successfully",
                    user: results,
                    token: jsontoken
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }
        });
    });
};

exports.loginVendor = (req, res, next) => {
    let body = req.body;
    const v = new Validator(body, {
        email: 'required|email',
        password: 'required'
    });

    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }

        getByEmailVendor(body, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }

            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                results.role = 'vendor';
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_EXPIRE
                });
                return res.status(200).json({
                    status: true,
                    message: "Login successfully",
                    user: results,
                    token: jsontoken
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }
        });
    });
};

exports.loginAdmin = (req, res, next) => {
    let body = req.body;
    const v = new Validator(body, {
        email: 'required|email',
        password: 'required'
    });
    
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }

        getByEmailAdmin(body, (err, results) => {
            
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }

            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                results.role = 'admin';
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_EXPIRE
                });
                return res.status(200).json({
                    status: true,
                    message: "Login successfully",
                    user: results,
                    token: jsontoken
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }
        });
    });
};

exports.meCustomer = (req, res, next) => {
    return res.status(200).json({
        status: true,
        user: req.user
    });
};

exports.meVendor = (req, res, next) => {
    return res.status(200).json({
        status: true,
        user: req.user
    });
};