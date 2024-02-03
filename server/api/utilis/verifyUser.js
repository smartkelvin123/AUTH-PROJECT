const jwt = require("jsonwebtoken");
const errorHandler = require("../utilis/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "you are not authicated"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "token no valid "));

    req.user = user;

    next();
  });
};

module.exports = {
  verifyToken,
};
