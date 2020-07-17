const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, productController.insert);
router.post('/import', checkToken, productController.import);
router.post('/importProduct', checkToken, productController.importProduct);
router.put('/update', checkToken, productController.update);
router.put('/changeFeatured', checkToken, productController.changeFeatured);
router.put('/changeStatus', checkToken, productController.changeStatus);
router.put('/changeStock', checkToken, productController.changeStock);
router.put('/changeDiscount', checkToken, productController.changeDiscount);
router.put('/changeTax', checkToken, productController.changeTax);
router.delete('/delete/:id', checkToken, productController.delete);
router.get('/all', checkToken, productController.all);
router.get('/single/:id', checkToken, productController.single);

module.exports = router;