const {
    dropdown
} = require('./../models/common.model');
const multer = require('multer');
const mkdirp = require('mkdirp');
const uniqid = require('uniqid');
const fs = require('fs');
const Jimp = require("jimp");

//Image Storage
const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = 'uploads/images';
        mkdirp.sync(dest);
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, 'listing-' + uniqid() + '-' + file.originalname);
    }
});

//Image Upload
var uploadImage = multer({
    storage: storageImage
}).fields([{ name: 'images' }]);

//Document Storage
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

//Document Upload
var uploadDocument = multer({
    storage: storageDocument
}).fields([{ name: 'document' }]);

//Resize Image
const resizeImages = async (files, path) => {
    if (!files) return next();
    await Promise.all(
        files.map(async file => {
            const newFilename = file;
            const image = await Jimp.read(path + file);
            await image.resize(300, 300);
            await image.writeAsync(`uploads/thumbs/${newFilename}`);
        })
    );
    return true;
};

//Delete Image
const deleteFiles = (files, callback) => {
    var i = files.length;
    files.forEach(function (filepath) {
        fs.unlink(filepath, function (err) {
            i--;
        });
    });
    callback(null);
}

//Dropdown Data
exports.dropdown = (req, res, next) => {
    let type = req.params.type;
    let data = req.body;
    let body = { "type": type, "data": data };
    body.currentSession = req.user;
    dropdown(body, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        return res.status(200).json({
            status: true,
            dropdown: result
        });
    });
}

//Upload Image
exports.upload = (req, res, next) => {
    uploadImage(req, res, function (err) {
        if (err) {
            res.status(500).json({ error_code: 1, err_desc: err });
            return;
        }
        var uploadedFiles = res.req.files.images;
        var result = [];
        uploadedFiles.forEach(file => {
            result.push(file.filename);
        });
        if (resizeImages(result, 'uploads/images/')) {
            res.status(200).json({ "files": result });
        }
    });
}

//Remove Image
exports.removeImage = (req, res, next) => {
    var image = req.body.image;
    var files = ['uploads/images/' + image, 'uploads/thumbs/' + image];
    deleteFiles(files, function (err) {
        if (err) {
            res.status(200).json({ "status": false });
        } else {
            res.status(200).json({ "status": true });
        }
    });
}

//Upload Document
exports.uploadDocument = (req, res, next) => {
    uploadDocument(req, res, function (err) {
        if (err) {
            res.status(500).json({ error_code: 1, err_desc: err });
            return;
        }
        var uploadedFiles = res.req.files.document;
        var result = [];
        uploadedFiles.forEach(file => {
            result.push(file.filename);
        });
        res.status(200).json({ "files": result });
    });
}

//Remove Document
exports.removeDocument = (req, res, next) => {
    var document = req.body.document;
    fs.unlink("uploads/documents/" + document, (err) => {
        res.status(200).json({ "status": true });
    });
}