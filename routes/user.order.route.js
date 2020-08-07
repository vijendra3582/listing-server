const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/user.order.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.get('/all', checkToken, orderController.all);
router.post('/place', checkToken, orderController.place);

module.exports = router;