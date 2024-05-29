const express = require('express');
const ResetPasswordController = require('../controller/resetpwdController');
const resetPassword = require('../controller/resetpwdFormController');

const router = express.Router();

router.post('/request-reset', ResetPasswordController.requestReset);
router.post('/reset/:token', resetPassword.resetPassword);
router.get('/reset/:token', resetPassword.checkToken);

module.exports = router;
