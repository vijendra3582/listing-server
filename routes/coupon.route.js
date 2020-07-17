const express = require('express');
const router = express.Router();
const couponController = require('./../controllers/coupon.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, couponController.insert);
router.put('/update', checkToken, couponController.update);
router.delete('/delete/:id', checkToken, couponController.delete);
router.get('/all', checkToken, couponController.all);
router.get('/single/:id', checkToken, couponController.single);

module.exports = router;