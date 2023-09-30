const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
router.get('/', userController.getUserLogIn);
router.post('/user-login',userController.postUserLogIn);
router.post('/user-signup',userController.postUserSingUp);

module.exports = router;