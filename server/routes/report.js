const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report')
router.get('/report/subReport', reportController.getSubjectReport)
router.get('/report/:sem', reportController.getSemesterReport)

module.exports = router;