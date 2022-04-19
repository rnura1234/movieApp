const express = require('express');
const router = express.Router();

const { updateUser, getUser, deleteUser, getAllUser } = require('../controller/userController');
const verifyToken = require('../verifyToken');

router
  .route('/:id')
  .put(verifyToken, updateUser)
  .get(verifyToken, getUser)
  .delete(verifyToken, deleteUser);
router.route('/').get(verifyToken, getAllUser);

module.exports = router;
