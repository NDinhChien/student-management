const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();
    
router.post('/user/login', userController.login);
module.exports = router;