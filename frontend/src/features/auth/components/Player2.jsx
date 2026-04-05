import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoPause, IoPlay } from "react-icons/io5";
import { getAllSong } from "../services/song.api";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

function Player2() {
  const [allSong, setAllSong] = useState([]);
  const fetchAllSong = async () => {
    const response = await getAllSong();
    setAllSong(response.songs);
  };
  useEffect(() => {
    fetchAllSong();
  }, []);

  const faceExpression = useSelector((state) => state.faceExpression);
  const songs = useSelector((state) => state.songs.data);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const currentSong = allSong[selectedImgIdx];
  const audioRef = useRef(null);
  // changing states
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setIsplay] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleDuration = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => nextSong();

    audio.addEventListener("loadedmetadata", handleDuration);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleDuration);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current && isPlay) {
      audioRef.current.play();
    }
  }, [selectedImgIdx]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
    console.log(e.target.value);
  };
  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const prevSong = () => {
    setSelectedImgIdx(() => {
      if (selectedImgIdx > 0) {
        return selectedImgIdx - 1;
      } else {
        return allSong.length - 1;
      }
    });
    setIsplay(true);
    setSpeed(1);
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };
  const nextSong = () => {
    setSelectedImgIdx(() => {
      if (selectedImgIdx < allSong.length) {
        return selectedImgIdx + 1;
      } else {
        return 0;
      }
    });
    setIsplay(true);
    setSpeed(1);
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlay) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsplay(!isPlay);
  };
  const playSong = (idx) => {
    setSelectedImgIdx(idx);
    setIsplay(true);
    setSpeed(1);
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };
  const changeSpeed = (value) => {
    audioRef.current.playbackRate = value;
    setSpeed(value);
  };
  const moodSongPlay = (idx) => {
    setSelectedImgIdx(idx);
    setIsplay(true);
    setSpeed(1);
    setTimeout(() => {
      audioRef.current.play();
    }, 0);
  };
  return (
    <div className=" min-h-screen px-4 py-3 font-light w-full bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className=" grid gap-5 grid-cols-1 lg:grid-cols-3 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        {faceExpression ? (
          <div className=" lg:col-span-2 h-[300px]">
            <div className=" mt-8">
              <h1 className="text-xl font-medium">
                Your Mood: {faceExpression}
              </h1>
              <div
                className=" overflow-y-scroll h-[380px] py-3 px-5  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-gray-400
  [&::-webkit-scrollbar-thumb]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:rounded-full"
              >
                {songs.length > 0 ? (
                  songs.map((song, idx) => {
                    return (
                      <div
                        onClick={() => moodSongPlay(idx)}
                        key={idx}
                        className={`${idx === selectedImgIdx ? "bg-gray-800" : ""} w-full customShadow rounded-md px-2 py-2 border border-[#99a1af4b] shadow shadow-[#110307] bg-[#030303] mt-3 flex h-16 gap-5`}
                      >
                        <div className="">
                          {/* Cover */}
                          <img
                            src={song.posterUrl}
                            alt={song.title}
                            className="h-full bg-cover object-cover shadow-lg mb-4"
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-[15px] font-semibold line-clamp-1">
                            {song.title}
                          </h3>
                          <p className="  text-[13px] font-medium mt-2">
                            <span>Mood: </span>
                            <span className=" uppercase ml-1">{song.mood}</span>
                          </p>
                        </div>
                        <div
                          onClick={() => moodSongPlay(idx)}
                          className="px-1.5 py-1.5 bg-[#cd3f64] rounded-full h-6 w-6 flex items-center justify-center cursor-pointer"
                        >
                          {isPlay && idx === selectedImgIdx ? (
                            <IoPause />
                          ) : (
                            <IoPlay />
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-lg font-medium text-white">
            Please click on Detect expression for get your mood song
          </h1>
        )}
        {currentSong ? (
          <div className=" lg:col-span-1">
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

              {/* Mood */}
              <div className="mt-3 text-center text-sm text-gray-400">
                Mood: {faceExpression}
              </div>
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
              <button
                onClick={prevSong}
                className="px-2 py-1 text-xl bg-[#cd3f64] rounded-full"
              >
                <MdSkipPrevious />
              </button>

              <button
                onClick={togglePlay}
                className="px-3 py-1 bg-[#cd3f64] text-xl rounded-full hover:scale-110 transition"
              >
                {isPlay ? (
                  <div className="px-1.5 py-1.5  rounded-full flex items-center justify-center cursor-pointer">
                    <IoPause />
                  </div>
                ) : (
                  <div className="px-1.5 py-1.5 rounded-full  flex items-center justify-center cursor-pointer">
                    <IoPlay />
                  </div>
                )}
              </button>

              <button
                onClick={nextSong}
                className="px-2 py-1 text-xl bg-[#cd3f64] rounded-full"
              >
                <MdSkipNext />
              </button>
            </div>

            {/* Speed */}
            <div className="mt-4 float-right flex justify-between w-fit gap-3 items-center">
              <span className="text-sm text-gray-300 font-medium">Speed</span>
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
          </div>
        ) : (
          <div className="text-white text-lg">No song selected</div>
        )}
      </div>

      <div className=" mt-8">
        <h1 className="text-xl font-medium">Selected For you</h1>
        <div
          className=" overflow-y-scroll h-[380px] py-3 px-5  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-gray-400
  [&::-webkit-scrollbar-thumb]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {allSong.length > 0 ? (
            allSong.map((song, idx) => {
              return (
                <div
                  onClick={() => playSong(idx)}
                  key={idx}
                  className={`${idx === selectedImgIdx ? "bg-gray-800" : ""} w-full customShadow rounded-md px-2 py-2 border border-[#99a1af4b] shadow shadow-[#110307] bg-[#030303] mt-3 flex h-16 gap-5`}
                >
                  <div className="">
                    {/* Cover */}
                    <img
                      src={song.posterUrl}
                      alt={song.title}
                      className="h-full bg-cover object-cover shadow-lg mb-4"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-[15px] font-semibold line-clamp-1">
                      {song.title}
                    </h3>
                    <p className="  text-[13px] font-medium mt-2">
                      <span>Mood: </span>
                      <span className=" uppercase ml-1">{song.mood}</span>
                    </p>
                  </div>
                  <div
                    onClick={() => playSong(idx)}
                    className="px-1.5 py-1.5 bg-[#cd3f64] rounded-full h-6 w-6 flex items-center justify-center cursor-pointer"
                  >
                    {isPlay && idx === selectedImgIdx ? (
                      <IoPause />
                    ) : (
                      <IoPlay />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Player2;
