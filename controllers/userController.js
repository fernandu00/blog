const mongoose = require("mongoose");
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

// register

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res
        .status(500)
        .json({ success: false, msg: "username is mandatory" });
    }
    if (!email) {
      return res
        .status(500)
        .json({ success: false, msg: "email is mandatory" });
    }
    if (!password) {
      return res
        .status(500)
        .json({ success: false, msg: "password is mandatory" });
    }
    const userExists = await userModel.findOne({ username: username });
    const emailInUse = await userModel.findOne({ email: email });
    if (userExists) {
      return res
        .status(500)
        .json({ success: false, msg: "username already exists" });
    }
    if (emailInUse) {
      return res.status(500).json({ success: false, msg: "email in use" });
    }
    const hashedPasswd = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, email, password: hashedPasswd });
    await newUser.save();
    return res.status(201).json({
      msg: "success",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// login

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username: username });

  try {
    if (!user) {
      return res.status(400).json({ success: false, msg: "invalid username" });
    }
    const hashed = user.password;
    const validate = await bcrypt.compare(password, hashed);

    if (!validate) {
      return res
        .status(500)
        .json({ success: false, data: "wrong credentials" });
    } else {
      return res.status(200).json({
        success: true,
        msg: `user ${user.username} logged in`,
        username: user.username,
        id: user._id,
        email: user.email,
        profilePic: user.profilePic,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ success: true, msg: updatedUser });
    } catch (error) {
      res.json(error);
    }
  } else {
    return res
      .status(401)
      .json({ success: false, msg: "you can update only your account" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const deleteUser = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, msg: "user deleted" });
    } catch (error) {
      res.json(error);
    }
  } else {
    return res
      .status(401)
      .json({ success: false, msg: "you can delete only your account" });
  }
};

// get single user

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

//  get all users

const getAllUsers = async (req, res) => {
  try {
    const allusers = await userModel.find({});
    res.status(200).json({ success: true, msg: allusers });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  register,
  login,
  updateUser,
  getSingleUser,
  deleteUser,
  getAllUsers,
};
