const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/database");
const authRouter = require("./routes/auth.route");
const cors = require("cors");
const songRouter = require("./routes/song.route");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://moodify-music-player.onrender.com/",
    credentials: true,
  }),
);
app.use(express.static('./public'))
connectToDB();
app.use("/", authRouter);
app.use('/', songRouter);

app.use('*name', (req, res) => {
  res.sendFile(path.join(__dirname,'..', '/public/index.html'))
})
module.exports = app;
