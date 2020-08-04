const express = require("express");
const router = express.Router();
const authController = require('./../controllers/auth.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/admin/login', authController.loginAdmin);

router.post('/vendor/register', authController.registerVendor);
router.post('/vendor/login', authController.loginVendor);
router.get('/vendor/me', checkToken, authController.meVendor);

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/me', checkToken, authController.meUser);
router.post('/user/update', checkToken, authController.updateUser);

module.exports = router;