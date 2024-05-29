// signInRoute.js
const express = require('express');
const router = express.Router();
const { signIn } = require('../controller/signinController');

router.post('/signin', signIn);

module.exports = router;
