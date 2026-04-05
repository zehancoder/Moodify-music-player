const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blackList.model");
const redis = require("../config/cache");
const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  const isBlackListToken = await redis.get(token)
  if (isBlackListToken) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};
module.exports = identifyUser;
