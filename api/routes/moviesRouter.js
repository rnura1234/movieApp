const express = require('express');
const {
  updateMovie,
  getMovie,
  deleteMovie,
  getAllMovie,
  createMovie,
  getRandomMovie,
} = require('../controller/movieController');
const router = express.Router();

const verifyToken = require('../verifyToken');

router.route('/:id').put(verifyToken, updateMovie).get(getMovie).delete(verifyToken, deleteMovie);

router.route('/').post(verifyToken, createMovie).get(verifyToken, getAllMovie);
router.get('/find/random', getRandomMovie);
module.exports = router;
