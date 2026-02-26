const express = require('express');
const router = express.Router();
const { getUserStats } = require('../controllers/userController');

router.route('/').get(getUserStats);

module.exports = router;
