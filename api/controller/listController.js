const MovieList = require('../model/listSchema');

exports.createList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const newList = await MovieList.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'list created succesfully',
        data: { newList },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('you are not allowed');
  }
};
exports.deleteList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      await MovieList.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'data deleted succesfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('you are not allowed');
  }
};

exports.getList = async (req, res, next) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list;
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await MovieList.aggregate([
          {
            $sample: { size: 10 },
          },{
            $match: { type: typeQuery, genre: genreQuery },
          },
        ]);
      }
    } else {
      list = await MovieList.aggregate([
        {
          $sample: { size: 10 },
        },
      ]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};
