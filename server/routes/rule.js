const ruleController = require('../controllers/rule');
const isAuth = require('../controllers/isAuth');
const express = require('express');
const router = express.Router();


// Lấy thông tin chi tiết một học sinh cụ thể rồi gửi cho client
router.get('/rule/:stt', isAuth, ruleController.getOne);

// Cập nhật quy định
router.patch('/rule/:stt', isAuth, ruleController.update);

//xóa 
router.post('/rule/class/', isAuth, ruleController.removeClass);

// đổi tên
router.post('/rule/renameclass/', isAuth, ruleController.renameClass);
// thêm lớp
router.post('/rule/addclass/', isAuth, ruleController.addClass);

module.exports = router;