const { Validator } = require('node-input-validator');
const { create, update, deleteA, single, all, featured, changeStatus, discount, tax, stock, importProduct } = require('./../models/product.model');
const multer = require('multer');
const mkdirp = require('mkdirp');
const uniqid = require('uniqid');
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const storageDocument = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = 'uploads/documents';
        mkdirp.sync(dest);
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, 'listing-' + uniqid() + '-' + file.originalname);
    }
});
var uploadDocument = multer({
    storage: storageDocument
}).single('file');

exports.insert = (req, res, next) => {
    let body = req.body;
    body.currentSession = req.user;
    const v = new Validator(body, {
        name: 'required|string|minLength:2|maxLength:255',
        slug: 'required|alphaDash',
        description: 'required',
        stock: 'required|numeric',
        status: 'required|in:active,inactive',
        category_id: 'required',
        sub_category_id: 'required',
        brand_id: 'required',
        sale_price: 'required|decimal',
        purchase_price: 'required|decimal',
        is_featured: 'required|in:yes,no',
        discount_type: 'required|in:flat,percent',
        discount: 'required|decimal',
        tax_type: 'required|in:flat,percent',
        tax: 'required|decimal',
        images: 'required',
        logo: 'required'
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        body.created_by = req.user.id;
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
        slug: 'required|alphaDash',
        description: 'required',
        stock: 'required|numeric',
        status: 'required|in:active,inactive',
        category_id: 'required',
        sub_category_id: 'required',
        brand_id: 'required',
        sale_price: 'required|decimal',
        purchase_price: 'required|decimal',
        is_featured: 'required|in:yes,no',
        discount_type: 'required|in:flat,percent',
        discount: 'required|decimal',
        tax_type: 'required|in:flat,percent',
        tax: 'required|decimal',
        images: 'required',
        logo: 'required'
    });
    body.created_by = req.user.id;
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

exports.changeFeatured = (req, res, next) => {
    let data = req.body;
    data.currentSession = req.user;
    const v = new Validator(data, {
        id: 'required',
        featured: 'required|in:0,1',
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        featured(data, (err, result) => {
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
    });
}

exports.changeStatus = (req, res, next) => {
    let data = req.body;
    data.currentSession = req.user;
    const v = new Validator(data, {
        id: 'required',
        status: 'required|in:0,1',
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        changeStatus(data, (err, result) => {
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
    });
}

exports.changeStock = (req, res, next) => {
    let data = req.body;
    data.currentSession = req.user;
    const v = new Validator(data, {
        id: 'required',
        stock: 'required|numeric',
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        stock(data, (err, result) => {
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
    });
}

exports.changeDiscount = (req, res, next) => {
    let data = req.body;
    data.currentSession = req.user;
    const v = new Validator(data, {
        id: 'required',
        discount_type: 'required|in:flat,percent',
        discount: 'required|decimal'
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        discount(data, (err, result) => {
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
    });
}

exports.changeTax = (req, res, next) => {
    let data = req.body;
    data.currentSession = req.user;
    const v = new Validator(data, {
        id: 'required',
        tax_type: 'required|in:flat,percent',
        tax: 'required|decimal'
    });
    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        tax(data, (err, result) => {
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
    });
}

exports.import = (req, res, next) => {
    uploadDocument(req, res, function (err) {
        var exceltojson;
        if (err) {
            res.status(422).json({ "status": false, "message": err });
            return;
        }
        if (!req.file) {
            res.status(422).json({ "status": false, "message": "No file passed to upload or import  !" });
            return;
        }
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            readXlsxFile(fs.createReadStream(req.file.path)).then((rows) => {
                fs.unlink(req.file.path, (err) => {
                    res.status(200).json({ "status": true, "data": rows, "message": "Data fetched successfully." });
                });
            });
        } else {
            fs.unlink(req.file.path, (err) => {
                res.status(422).json({ "status": false, "message": "Please choose xlsx file !" });
                return;
            });
        }
    })
}

exports.importProduct = (req, res, next) => {
    let data = req.body;
    data.currentSession = req.user;
    importProduct(data, currentSession, (err, result) => {
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