const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controller/userController');

router.route('/register').post(createUser);
router.route('/login').get(loginUser);

module.exports = router;
