const express = require('express');
const router = express.Router();
const bundleController = require('./../controllers/bundle.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, bundleController.insert);
router.put('/update', checkToken, bundleController.update);
router.put('/changeFeatured', checkToken, bundleController.changeFeatured);
router.put('/changeStatus', checkToken, bundleController.changeStatus);
router.put('/changeStock', checkToken, bundleController.changeStock);
router.put('/changeDiscount', checkToken, bundleController.changeDiscount);
router.put('/changeTax', checkToken, bundleController.changeTax);
router.delete('/delete/:id', checkToken, bundleController.delete);
router.get('/all', checkToken, bundleController.all);
router.get('/single/:id', checkToken, bundleController.single);

module.exports = router;