const express = require("express");
const {
  fetch,
  update,
  deleteUser,
} = require("../controller/userController.js");
const ensureAuthenticated = require("../middlewares/auth.js");

const route = express.Router();

route.get("/", ensureAuthenticated, (req, res) => {
  res.send("Welcome NODE-JS");
});
route.get("/getAllUsers", ensureAuthenticated, fetch);
route.put("/update/:id", ensureAuthenticated, update);
route.delete("/delete/:id", ensureAuthenticated, deleteUser);

module.exports = route;
