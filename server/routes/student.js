const studentController = require('../controllers/student');
const isAuth = require('../controllers/isAuth');
const express = require('express');
const router = express.Router();

// Lấy danh sách tất cả học sinh gửi cho client
router.get('/student/getAll', isAuth, studentController.getAll);
// Lấy thông tin chi tiết một học sinh cụ thể rồi gửi cho client
router.get('/student/:id', isAuth, studentController.getOne);
// thêm một học sinh
router.post('/student', isAuth, studentController.insert);
// Cập nhật thông tin chi tiết học sinh
router.patch('/student/:mahs', isAuth, studentController.update);
// Xóa một học sinh khỏi DB
router.delete('/student/:mahs', isAuth, studentController.remove);

module.exports = router;