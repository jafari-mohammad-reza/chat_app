const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.Login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({
        message: "Please provide email or username and password",
      });
    }
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    user.access_token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    await user.save();
    return res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.Register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please provide all the fields",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    const user = await UserModel.findOne({
      $or: [{ email: email }, { userName: username }],
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await UserModel.create({
      email,
      userName: username,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
