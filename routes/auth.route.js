const express = require("express");
const router = express.Router();
const authController = require('./../controllers/auth.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/admin/login', authController.loginAdmin);

router.post('/vendor/register', authController.registerVendor);
router.post('/vendor/login', authController.loginVendor);
router.get('/vendor/me', checkToken, authController.meVendor);

router.post('/customer/register', authController.registerCustomer);
router.post('/customer/login', authController.loginCustomer);
router.get('/customer/me', checkToken, authController.meCustomer);

module.exports = router;