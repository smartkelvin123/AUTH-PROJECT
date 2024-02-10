const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { verifyToken } = require("../utilis/verifyUser");

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
