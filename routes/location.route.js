const express = require("express");
const router = express.Router();
const locationController = require('./../controllers/location.controller');

router.get('/country', locationController.country);
router.get('/state/:country_id', locationController.state);
router.get('/city/:state_id', locationController.city)

module.exports = router;