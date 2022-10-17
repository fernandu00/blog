const router = require("express").Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");

// register

router.post("/register", async (req, res) => {
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
});

// login

router.post("/login", async (req, res) => {
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
      return res
        .status(200)
        .json({ success: true, msg: `user ${username} logged in` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
