const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Username already exists",
      });
    }

    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      res.status(200).json({
        status: "Login success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "incorrect username or password",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};
