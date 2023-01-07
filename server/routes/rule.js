const ruleController = require('../controllers/rule');
const isAuth = require('../controllers/isAuth');
const express = require('express');
const router = express.Router();


// Lấy thông tin chi tiết một học sinh cụ thể rồi gửi cho client
router.get('/rule/:stt', isAuth, ruleController.getOne);

// Cập nhật quy định
router.patch('/rule/:stt', isAuth, ruleController.update);


module.exports = router;