const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const { checkToken } = require('./../middlewares/auth.middleware');

router.post('/insert', checkToken, userController.insert);
router.put('/update', checkToken, userController.update);
router.delete('/delete/:id', checkToken, userController.delete);
router.get('/all', checkToken, userController.all);
router.get('/single/:id', checkToken, userController.single);

module.exports = router;