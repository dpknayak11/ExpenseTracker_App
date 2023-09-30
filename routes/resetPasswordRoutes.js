const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const authenticate = require('../middleware/auth.js');

router.get('/passwordForgotPage',passwordController.getPasswordForgot);
router.post('/sendEmail',passwordController.sendEmail);
router.get('/resetPassword/:requestId',passwordController.getResetPassword);
router.post('/resetPassword/:requestId',passwordController.updatePassword);

module.exports = router;