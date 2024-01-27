const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utilis/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // const hashedPassword = bcryptjs.hashSync(password, 10);
  const salt = await bcryptjs.genSaltSync(10);
  const hashedPassword = await bcryptjs.hashSync(req.body.password, salt);

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

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) return next(errorHandler(401, "Wrong credentails"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc; // _doc not to get more information from the database
    const expiryDate = new Date(Date.now() + 7200000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })

      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
};
