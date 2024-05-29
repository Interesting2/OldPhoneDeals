const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');

router.post('/comments', itemController.createComment);

module.exports = router;
