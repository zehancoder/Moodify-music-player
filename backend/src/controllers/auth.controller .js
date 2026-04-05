const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const blacklistModel = require("../models/blackList.model");
const redis = require('../config/cache');
//register user
const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exist with this email or username",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    email,
    username,
    password: hashPassword,
  });
  const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token", token);
  res.status(201).json({
    message: "Successfully Register",
    user,
    token,
  });
};

// login user
const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");
  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "Successfully Login",
    user,
    token,
  });
};

//get-me
const getMe = async (req, res) => {
  const userData = req.user;
  const user = await userModel.findById(userData.id);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "User fetched successfuly",
    user,
  });
};

//logout user
const logout = async (req, res) => {
  const token = req.cookies.token;
  res.clearCookie('token');
  await redis.set(token, Date.now().toString(), 'EX', 120 * 120);
  
  res.status(200).json({
    message: "Logout Successfully"
  })
};
module.exports = { registerUser, loginUser, getMe, logout };
