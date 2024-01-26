const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
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
    res.status(500).json(error.message);
  }
};

module.exports = {
  signup,
};
