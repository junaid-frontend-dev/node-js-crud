const UserModel = require("../model/userModel");

const fetch = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User Not Found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserModel.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found." });
    }
    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await UserModel.findById({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found." });
    }
    await UserModel.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

module.exports = {
  fetch,
  update,
  deleteUser,
};
