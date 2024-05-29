const express = require('express');
const transactionController = require('../controller/checkoutController');
const router = express.Router();

router.post('/', transactionController.processTransaction);

module.exports = router;
