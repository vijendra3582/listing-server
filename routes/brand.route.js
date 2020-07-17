const express = require('express');
const router = express.Router();
const brandController = require('./../controllers/brand.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, brandController.insert);
router.put('/update', checkToken, brandController.update);
router.delete('/delete/:id', checkToken, brandController.delete);
router.get('/all', checkToken, brandController.all);
router.get('/single/:id', checkToken, brandController.single);

module.exports = router;