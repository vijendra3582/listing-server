const express = require('express');
const router = express.Router();
const vendorController = require('./../controllers/vendor.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, vendorController.insert);
router.put('/update', checkToken, vendorController.update);
router.delete('/delete/:id', checkToken, vendorController.delete);
router.get('/all', checkToken, vendorController.all);
router.get('/single/:id', checkToken, vendorController.single);

module.exports = router;