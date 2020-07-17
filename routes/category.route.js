const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/category.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, categoryController.insert);
router.put('/update', checkToken, categoryController.update);
router.delete('/delete/:id', checkToken, categoryController.delete);
router.get('/all', checkToken, categoryController.all);
router.get('/single/:id', checkToken, categoryController.single);

module.exports = router;