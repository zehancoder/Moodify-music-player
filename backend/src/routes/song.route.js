const express = require("express");
const upload = require("../middleware/upload.middleware");
const uploadSong = require("../controllers/song.controller");
const identifyUser = require("../middleware/auth.middleware");
const songRouter = express.Router();
songRouter.post("/create/song", upload.single("song"), uploadSong.uploadSong);
songRouter.get("/get/songs", uploadSong.getSongByMood);
songRouter.get("/getAll/songs", uploadSong.getAllsongContoller);
module.exports = songRouter;
