const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");
const uploadSong = async (req, res) => {
  const songBuffer = req.file.buffer; // we can get song autometically from upload song middleware;
  const tags = id3.read(songBuffer);
  const { mood } = req.body;
  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/cohort2/moodify/songs",
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/cohort2/moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });
  res.status(201).json({
    message: "song created successfuly",
    song,
  });
};

// get songs controllers
const getSongByMood = async (req, res) => {
  const { mood } = req.query;
  const song = await songModel.find({
    mood,
  });
  res.status(200).json({
    message: "song fetched successfully",
    song,
  });
};

// geeting all songs
const getAllsongContoller = async (req, res) => {
  // const user = req.user;
  // if (!user) {
  //   return res.status({
  //     message: "User not found",
  //   });
  // }
  const songs = await songModel.find();
  res.status(200).json({
    message: "songs fetch success",
    songs,
  });
};
module.exports = { uploadSong, getSongByMood, getAllsongContoller };
