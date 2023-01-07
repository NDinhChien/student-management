const classController = require('../controllers/class');
const isAuth = require('../controllers/isAuth');

const express = require('express');
const router = express.Router();

// Lấy danh sách các lớp
router.get('/class/listClass', isAuth, classController.getName)

router.patch('/class/:id&:className', isAuth, classController.updateClassInfo);
router.get('/class/stuList', isAuth, classController.stuList)
router.get('/class/:name', isAuth, classController.getAll)



// Cập nhật tên lớp




module.exports = router;