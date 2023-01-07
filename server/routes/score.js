const scoreController = require('../controllers/score');
const express = require('express');
const router = express.Router();

router.post('/score/getAll', scoreController.getAll)
router.patch('/score', scoreController.update)
module.exports = router;

// get post put patch delete