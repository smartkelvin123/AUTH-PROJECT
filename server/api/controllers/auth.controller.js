const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utilis/error");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    // next(errorHandler(300, "something went wront"));
    next(error);
  }
};

module.exports = {
  signup,
};
