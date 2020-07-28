const express = require('express');
const router = express.Router();
const cartController = require('./../controllers/cart.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/save', checkToken, cartController.save);
router.put('/increment', checkToken, cartController.increment);
router.put('/decrement', checkToken, cartController.decrement);
router.delete('/remove/:product_id', checkToken, cartController.remove);
router.get('/all', checkToken, cartController.all);

module.exports = router;