// routes/signupRoute.js
const express = require('express');
const searchController = require('../controller/searchController');

const router = express.Router();

// Sign-up route
router.get('/search', searchController.getSearchResults);

module.exports = router;
