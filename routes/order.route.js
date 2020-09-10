const express = require('express');
const router = express.Router();
const orderController = require('./../controllers/order.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, orderController.insert);
router.put('/update', checkToken, orderController.update);
router.delete('/delete/:id', checkToken, orderController.delete);
router.get('/all', checkToken, orderController.all);
router.get('/single/:id', checkToken, orderController.single);

module.exports = router;