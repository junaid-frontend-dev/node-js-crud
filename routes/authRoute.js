const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const { login, signup } = require("../controller/authController");

const route = express.Router();

route.post("/login", loginValidation, login);
route.post("/signup", signupValidation, signup);

module.exports = route;
