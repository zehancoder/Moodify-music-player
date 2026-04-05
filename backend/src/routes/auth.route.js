const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  logout,
} = require("../controllers/auth.controller ");
const identifyUser = require("../middleware/auth.middleware");
const authRouter = Router();
authRouter.post(`/register`, registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/get-me", identifyUser, getMe);
authRouter.post('/logout', logout)
module.exports = authRouter;
