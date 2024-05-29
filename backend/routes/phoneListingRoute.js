// routes/signupRoute.js
const express = require('express');
const phoneListingController = require('../controller/phoneListingController');

const router = express.Router();

// Get all phone listings
router.get('/sold-out-soon', phoneListingController.getSoldOutSoon);
router.get('/best-sellers', phoneListingController.getBestSellers);
module.exports = router;
