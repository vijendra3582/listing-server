const express = require('express');
const router = express.Router();
const addressController = require('./../controllers/address.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, addressController.insert);
router.put('/update', checkToken, addressController.update);
router.delete('/delete/:id', checkToken, addressController.delete);
router.get('/all', checkToken, addressController.all);
router.get('/single/:id', checkToken, addressController.single);

module.exports = router;