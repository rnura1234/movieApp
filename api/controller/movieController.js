const Movie = require('../model/movieSchema');
const jwt = require('jsonwebtoken');

//CREATE NEW MOVIE
exports.createMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const newMovie = await Movie.insertMany(req.body);
      res.status(201).json({
        status: 'success',
        message: 'created successfully',
        data: {
          newMovie,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'faild',
        errMessage: err,
      });
    }
    next();
  } else {
    res.status(403).json("you can't create new movie");
  }
};

//UPDATE MOVIE(ONLY ADMIN UPDATE MOVIE)
exports.updateMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        status: 'success',
        message: 'movie has been updated succesfully',
        data: {
          updateMovie,
        },
      });
    } catch (error) {
      res.status(401).json({
        status: 'failed',
        message: {
          error,
        },
      });
    }
  } else {
    res.status(403).json('you can update only your account');
  }
};
exports.deleteMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: 'success',
        message: 'movie deleted succesfully',
      });
    } catch (error) {
      res.status(401).json({
        status: 'failed',
        message: {
          error,
        },
      });
    }
  } else {
    res.status(403).json('you can delete only your account');
  }
};
exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getRandomMovie = async (req, res, next) => {
  try {
    const type = req.query.type;
    console.log(type);
    let movie;
    if (type == 'series') {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: true },
        }, {
          $sample: { size: 1 },
        },
      ]);
      console.log(movie);
    } else {
      movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
      console.log(movie);
    }
    return res.status(200).json({
      status: 'success',
      data: {
        movie,
      },
    });
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getAllMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const query = req.query.new;
      const movies = query ? await Movie.find().limit(10) : await Movie.find();
      console.log(movies);
      res.status(200).json({
        status: 'success',
        results: movies.length,
        data: {
          movies,
        },
      });
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(403).json('you can not see all the users');
  }
};
