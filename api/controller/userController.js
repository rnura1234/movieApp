const User = require('../model/userSchema');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
exports.createUser = async (req, res, next) => {
 
    try {
      const newUser = await User.insertMany({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
      });
  
      res.status(201).json({
        status: 'success',
        message: 'created successfully',
        data: {
          newUser,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'faild',
        errMessage: err,
      });
    }
    next();
  };
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    !user && res.status(401).json('wrong username or password');

    var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password && res.status(401).json('wrong username or password');

    const accesToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    const { password, ...info } = user._doc;

    return res.status(200).json({ accesToken, ...info });
  } catch (err) {
    return res.status(401).json(err);
  }

  next();
};

exports.updateUser = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.user);

  if (req.params.id == req.user.id || req.user.isAdmin) {
    try {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        {
          new: true,
        }
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(403).json('you can update only your account');
  }
};
exports.deleteUser = async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.user.id);
  console.log(req.user.isAdmin);
  if (req.params.id == req.user.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);

      return res.status(200).json('deleted succesfully');
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(403).json('you can delete only your account');
  }
};
exports.getUser = async (req, res, next) => {
  if (req.params.id == req.user.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      return res.status(200).json(info);
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(403).json('you can update only your account');
  }
};
exports.getAllUser = async (req, res, next) => {
  
  if (req.user.isAdmin) {
    try {
      const query = req.query.new;
      const users = query ? await User.find().limit(10) : await User.find();

      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users,
        },
      });
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res.status(403).json('you can not see all the users');
  }
};
