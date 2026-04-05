import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Player() {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  // 🔥 NEW: track current song index
  const [currentIndex, setCurrentIndex] = useState(0);

  const faceExpression = useSelector((state) => state.faceExpression);
  const songs = useSelector((state) => state.songs.data);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => nextSong(); // 🔥 auto next

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex]);

  // 🔥 Auto play when song changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 🔥 Select song
  const playSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);

    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };

  // 🔥 Next / Prev
  const nextSong = () => {
    setCurrentIndex((prev) =>
      prev < songs.length - 1 ? prev + 1 : 0
    );
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : songs.length - 1
    );
    setIsPlaying(true);
  };

  const skipForward = () => {
    audioRef.current.currentTime += 5;
    setCurrentTime(audioRef.current.currentTime);
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 5;
    setCurrentTime(audioRef.current.currentTime);
  };

  const changeSpeed = (newSpeed) => {
    audioRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {currentSong ? (
        <div className="w-[350px] bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
          
          {/* Cover */}
          <div className="flex flex-col items-center">
            <img
              src={currentSong.posterUrl}
              alt={currentSong.title}
              className="w-48 h-48 rounded-xl object-cover shadow-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-center">
              {currentSong.title}
            </h3>
          </div>

          {/* Audio */}
          <audio ref={audioRef} src={currentSong.url} />

          {/* Progress */}
          <div className="mt-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-green-400 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-5">
            <button onClick={prevSong} className="px-3 py-2 bg-white/20 rounded-full">⏮</button>

            <button
              onClick={togglePlay}
              className="px-5 py-3 bg-green-500 rounded-full hover:scale-110 transition"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button onClick={nextSong} className="px-3 py-2 bg-white/20 rounded-full">⏭</button>
          </div>

          {/* Speed */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-300">Speed</span>
            <select
              value={speed}
              onChange={(e) => changeSpeed(parseFloat(e.target.value))}
              className="bg-black/40 px-2 py-1 rounded-md text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>

          {/* 🔥 Playlist */}
          <div className="mt-5 max-h-40 overflow-y-auto space-y-2">
            {songs.map((song, index) => (
              <div
                key={index}
                onClick={() => playSong(index)}
                className={`p-2 rounded cursor-pointer text-sm ${
                  index === currentIndex
                    ? "bg-green-500 text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {song.title}
              </div>
            ))}
          </div>

          {/* Mood */}
          <div className="mt-3 text-center text-sm text-gray-400">
            Mood: {faceExpression}
          </div>
        </div>
      ) : (
        <div className="text-white text-lg">No song selected</div>
      )}
    </div>
  );
}

export default Player;