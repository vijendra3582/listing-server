const express = require("express");
const router = express.Router();
const commonController = require('./../controllers/common.controller');
const { checkToken } = require('./../middlewares/not-auth.middleware');

router.post('/dropdown/:type', checkToken, commonController.dropdown);
router.post('/upload', commonController.upload);
router.post('/removeImage', commonController.removeImage);
router.post('/uploadDocument', commonController.uploadDocument);
router.post('/removeDocument', commonController.removeDocument);

module.exports = router;