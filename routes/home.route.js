const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home.controller');

router.post('/details', homeController.details);
router.get('/vendor/:slug', homeController.vendor);
router.get('/products/:vendor_slug', homeController.products);
router.post('/listing', homeController.listing);
router.post('/filter', homeController.filter);

module.exports = router;