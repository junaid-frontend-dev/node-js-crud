const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist.",
      });
    }
    const userModels = new UserModel({ name, email, password });
    userModels.password = await bcrypt.hash(password, 10);
    await userModels.save();
    res.status(409).json({
      message: "Signup successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server error.", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "auth is wrong",
      });
    }
    const isPassEqul = await bcrypt.compare(password, user.password);
    if (!isPassEqul) {
      return res.status(403).json({
        message: "password is wrong",
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Signin successfully.",
      success: true,
      jwtToken,
      email,
      name: user.name,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

module.exports = {
  login,
  signup,
};
