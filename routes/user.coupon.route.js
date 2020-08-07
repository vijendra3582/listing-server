const express = require('express');
const router = express.Router();
const couponController = require('./../controllers/user.coupon.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/check', checkToken, couponController.check);

module.exports = router;