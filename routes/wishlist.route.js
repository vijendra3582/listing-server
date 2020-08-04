const express = require('express');
const router = express.Router();
const wishlistController = require('./../controllers/wishlist.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, wishlistController.insert);
router.delete('/delete/:id', checkToken, wishlistController.delete);
router.get('/all', checkToken, wishlistController.all);
router.get('/single/:id', checkToken, wishlistController.single);

module.exports = router;