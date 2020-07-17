const express = require('express');
const router = express.Router();
const subCategoryController = require('./../controllers/sub-category.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, subCategoryController.insert);
router.put('/update', checkToken, subCategoryController.update);
router.delete('/delete/:id', checkToken, subCategoryController.delete);
router.get('/all', checkToken, subCategoryController.all);
router.get('/single/:id', checkToken, subCategoryController.single);

module.exports = router;