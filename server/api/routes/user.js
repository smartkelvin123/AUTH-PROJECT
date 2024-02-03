const express = require("express");
const { test, updateUser } = require("../controllers/user.controller");
const { verifyToken } = require("../utilis/verifyUser");

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
