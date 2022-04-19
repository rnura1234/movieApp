const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
     
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          res.status(403).json('token is not valid');
        }
        console.log(user);
        req.user = user;
      });
    } else {
      return res.status(401).json('your are not authenticated');
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  next();
};

module.exports = verifyToken;
