const homeController = require('../controllers/home');

const express = require('express');
const router = express.Router();

router.get('/', homeController.homepage);
router.get('/login', homeController.loginpage);
router.get('/logout', homeController.logoutpage);
router.get('/student', homeController.studentpage);
router.get('/class', homeController.classpage);
router.get('/score', homeController.scorepage);
router.get('/report', homeController.reportpage);
module.exports = router;