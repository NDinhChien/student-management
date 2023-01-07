const classController = require('../controllers/class');
const isAuth = require('../controllers/isAuth');

const express = require('express');
const router = express.Router();

router.patch('/class/:id&:className', isAuth, classController.updateClassInfo);
router.get('/class/stuList', isAuth, classController.stuList)
router.get('/class/:name', isAuth, classController.getAll)


module.exports = router;