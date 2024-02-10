const user = require("../models/user");
const errorHandler = require("../utilis/error");
const bcryptjs = require("bcryptjs");

const test = (req, res) => {
  res.json({
    message: "Welcome to the API!",
  });
};

// update user
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can update only your account "));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await user.findByIdAndUpdate(
      // ...req.body,   this is not ideal to use because hacker could change is_admin to true so it is ideal to pass each other separetly
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can delete only your account "));
  }

  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { test, updateUser, deleteUser };
