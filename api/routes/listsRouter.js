// const express = require('express');
// const User = require('../model/userSchema');

// const router = express.Router();

// router.route('/register').post(async function (req, res) {

//   const newUser = await User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   });
// })

// module.exports = router;

const express = require('express');
const { createList, getList } = require('../controller/listController');
const verifyToken = require('../verifyToken');
const router = express.Router();
router.post('/', verifyToken, createList).get('/',getList);

module.exports = router;